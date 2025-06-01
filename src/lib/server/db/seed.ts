import { db } from './index';
import { quizzes, quizResults, quizCategories, challengeTypes } from './schema';
import { eq } from 'drizzle-orm';

async function cleanQuizzes() {
    try {
        console.log('Deleting all quiz results and quizzes...');
        await db.delete(quizResults);
        await db.delete(quizzes);
        console.log('✅ Quizzes and quiz results deleted successfully!');
    } catch (error) {
        console.error('❌ Error deleting quizzes and quiz results:', error);
        throw error;
    }
}

async function seedHtmlQuizzes() {
    // 1. Ensure HTML category exists
    let htmlCategory = await db.query.quizCategories.findFirst({
        where: eq(quizCategories.name, 'HTML')
    });
    if (!htmlCategory) {
        const inserted = await db.insert(quizCategories).values({ name: 'HTML' }).returning();
        htmlCategory = inserted[0];
    }

    // 2. Ensure Multiple Choice challenge type exists for HTML
    let mcType = await db.query.challengeTypes.findFirst({
        where: eq(challengeTypes.name, 'Multiple Choice')
    });
    if (!mcType) {
        const inserted = await db.insert(challengeTypes).values({
            name: 'Multiple Choice',
            description: 'Choose the correct answer from the options.',
            quizCategoryId: htmlCategory.id
        }).returning();
        mcType = inserted[0];
    }

    // 3. Prepare easy HTML quizzes
    const easyHtmlQuizzes = [
        {
            title: 'What does HTML stand for? (HyperText Markup Language)',
            description: 'HTML is the standard markup language for creating web pages. It describes the structure of a web page using markup.',
            explanation: 'HTML stands for HyperText Markup Language. It is used to structure content on the web, such as headings, paragraphs, links, and more.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '0',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'What does HTML stand for?',
                    options: [
                        'HyperText Markup Language',
                        'Home Tool Markup Language',
                        'Hyperlinks and Text Markup Language',
                        'Hyperlinking Text Mark Language'
                    ],
                    correctAnswer: 0
                }
            ]),
            quizCategoryId: htmlCategory.id,
            challengeTypeId: mcType.id
        },
        {
            title: 'What is the correct HTML element for the largest heading?',
            description: 'HTML provides six levels of headings, from h1  to h6  .just because it is the largest heading does not mean it is the most important.',
            explanation: '<h1> defines the most important heading, while <h6> defines the least important.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '0',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'What is the correct HTML element for the largest heading?',
                    options: ['<h1>', '<heading>', '<h6>', '<head>'],
                    correctAnswer: 0
                }
            ]),
            quizCategoryId: htmlCategory.id,
            challengeTypeId: mcType.id
        },
        {
            title: 'Which tag is used to create a hyperlink in HTML?',
            description: 'Hyperlinks are created using the a tag, which stands for anchor.',
            explanation: 'The <a> tag defines a hyperlink, which is used to link from one page to another.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '0',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'Which tag is used to create a hyperlink in HTML?',
                    options: ['<a>', '<link>', '<href>', '<hyperlink>'],
                    correctAnswer: 0
                }
            ]),
            quizCategoryId: htmlCategory.id,
            challengeTypeId: mcType.id
        },
        {
            title: 'Which attribute is used to provide alternative text for an image?',
            description: 'The alt attribute provides alternative text for images if they cannot be displayed.',
            explanation: 'The alt attribute is important for accessibility and SEO, describing the image content.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '1',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'Which attribute is used to provide alternative text for an image?',
                    options: ['title', 'alt', 'src', 'longdesc'],
                    correctAnswer: 1
                }
            ]),
            quizCategoryId: htmlCategory.id,
            challengeTypeId: mcType.id
        },
        {
            title: 'What is the correct HTML element for inserting a line break? ',
            description: 'The br tag inserts a single line break in the content.',
            explanation: 'The <br> element is an empty tag and does not require a closing tag.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '0',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'What is the correct HTML element for inserting a line break?',
                    options: ['<br>', '<lb>', '<break>', '<newline>'],
                    correctAnswer: 0
                }
            ]),
            quizCategoryId: htmlCategory.id,
            challengeTypeId: mcType.id
        }
    ];

    // 4. Insert quizzes
    for (const quiz of easyHtmlQuizzes) {
        await db.insert(quizzes).values(quiz);
    }
    console.log('✅ Seeded easy HTML quizzes!');
}

// Run cleaning and seeding
(async () => {
    await cleanQuizzes();
    await seedHtmlQuizzes();
})(); 