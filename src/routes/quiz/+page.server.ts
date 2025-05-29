import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { quizzes, quizCategories, challengeTypes } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { error as svelteError } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
    const id = url.searchParams.get('id');
    let quiz;

    if (id) {
        quiz = await db.query.quizzes.findFirst({
            where: eq(quizzes.id, Number(id))
        });
        if (!quiz) throw svelteError(404, 'Quiz not found');
    } else {
        const categoryName = url.searchParams.get('category');
        let difficulty = url.searchParams.get('difficulty');
        if (!categoryName || !difficulty) throw svelteError(404, 'Quiz not found');
        difficulty = difficulty.toUpperCase();
        if (!['EASY', 'MEDIUM', 'HARD'].includes(difficulty)) throw svelteError(404, 'Invalid difficulty');
        const category = await db.query.quizCategories.findFirst({
            where: eq(quizCategories.name, categoryName)
        });
        if (!category) throw svelteError(404, 'Quiz category not found');
        quiz = await db.query.quizzes.findFirst({
            where: and(
                eq(quizzes.quizCategoryId, category.id),
                eq(quizzes.difficulty, difficulty as 'EASY' | 'MEDIUM' | 'HARD')
            )
        });
        if (!quiz) throw svelteError(404, 'Quiz not found');
    }

    // Fetch the challenge type name
    let challengeTypeName = null;
    if (quiz.challengeTypeId) {
        const challengeType = await db.query.challengeTypes.findFirst({
            where: eq(challengeTypes.id, quiz.challengeTypeId)
        });
        if (challengeType) {
            challengeTypeName = challengeType.name;
        }
    }

    let questions = [];
    if (quiz.options) {
        try {
            questions = typeof quiz.options === 'string' ? JSON.parse(quiz.options) : [];
        } catch (e) {
            questions = [];
        }
    }

    // If Complete the Code or Code Challenge and questions is empty, create a default question
    if ((challengeTypeName === 'Complete the Code' || challengeTypeName === 'Code Challenge') && (!questions || questions.length === 0)) {
        questions = [
            {
                id: 1,
                question: quiz.description,
                starterCode: quiz.answer,
                correctAnswer: quiz.answer
            }
        ];
    }

    return {
        quiz: {
            id: quiz.id,
            title: quiz.title,
            description: quiz.description,
            difficulty: quiz.difficulty,
            questions,
            answer: quiz.answer,
            challengeType: challengeTypeName
        },
        category: quiz.quizCategoryId,
        difficulty: quiz.difficulty
    };
}; 