import { db } from './index';
import { quizzes, quizCategories, challengeTypes, quizResults } from './schema';
import { eq, inArray } from 'drizzle-orm';



async function seedHtmlQuizzes() {
    // 1. Ensure HTML category exists
    let htmlCategory = await db.query.quizCategories.findFirst({
        where: eq(quizCategories.name, 'HTML')
    });
    if (!htmlCategory) {
        const inserted = await db.insert(quizCategories).values({ name: 'HTML' }).returning();
        htmlCategory = inserted[0];
    }

    // 2. Ensure challenge types exist for HTML
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

    let codeChallengeType = await db.query.challengeTypes.findFirst({
        where: eq(challengeTypes.name, 'Code Challenge')
    });
    if (!codeChallengeType) {
        const inserted = await db.insert(challengeTypes).values({
            name: 'Code Challenge',
            description: 'Write code to solve a problem',
            quizCategoryId: htmlCategory.id
        }).returning();
        codeChallengeType = inserted[0];
    }

    let identificationType = await db.query.challengeTypes.findFirst({
        where: eq(challengeTypes.name, 'Identification')
    });
    if (!identificationType) {
        const inserted = await db.insert(challengeTypes).values({
            name: 'Identification',
            description: 'Identify the correct HTML element or attribute',
            quizCategoryId: htmlCategory.id
        }).returning();
        identificationType = inserted[0];
    }

    let timeTrialType = await db.query.challengeTypes.findFirst({
        where: eq(challengeTypes.name, 'Time Trial')
    });
    if (!timeTrialType) {
        const inserted = await db.insert(challengeTypes).values({
            name: 'Time Trial',
            description: 'Complete the task within a time limit',
            quizCategoryId: htmlCategory.id
        }).returning();
        timeTrialType = inserted[0];
    }

    // 3. Prepare easy HTML quizzes (Multiple Choice)
    const easyHtmlQuizzes = [
        {
            title: 'What does HTML stand for?',
            description: 'Basic HTML question.',
            explanation: 'HTML stands for HyperText Markup Language.',
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
            title: 'Which HTML element is used for the largest heading?',
            description: 'Heading elements.',
            explanation: '<h1> is the largest heading element.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '0',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'Which HTML element is used for the largest heading?',
                    options: ['<h1>', '<heading>', '<h6>', '<head>'],
                    correctAnswer: 0
                }
            ]),
            quizCategoryId: htmlCategory.id,
            challengeTypeId: mcType.id
        },
        {
            title: 'Which tag is used to create a hyperlink in HTML?',
            description: 'Hyperlink tag.',
            explanation: '<a> tag is used for hyperlinks.',
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
            description: 'Image accessibility.',
            explanation: 'The alt attribute provides alternative text for images.',
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
            title: 'What is the correct HTML element for inserting a line break?',
            description: 'Line break tag.',
            explanation: '<br> element inserts a line break.',
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
        },
        {
            title: 'Which HTML element defines a paragraph?',
            description: 'Paragraph element.',
            explanation: '<p> element defines a paragraph.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '2',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'Which HTML element defines a paragraph?',
                    options: ['<para>', '<text>', '<p>', '<br>'],
                    correctAnswer: 2
                }
            ]),
            quizCategoryId: htmlCategory.id,
            challengeTypeId: mcType.id
        },
        {
            title: 'What is the correct HTML for adding a background color?',
            description: 'Background color.',
            explanation: 'Background color is typically set using CSS, but inline styles or the bgcolor attribute (deprecated) could be used.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '3',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'What is the correct HTML for adding a background color?',
                    options: ['<body color="yellow">', '<background>yellow</background>', '<bgcolor>yellow</bgcolor>', '<body style="background-color:yellow;">'],
                    correctAnswer: 3
                }
            ]),
            quizCategoryId: htmlCategory.id,
            challengeTypeId: mcType.id
        },
        {
            title: 'Which HTML element specifies a footer for a document or section?',
            description: 'Footer element.',
            explanation: '<footer> element specifies a footer.',
            difficulty: 'EASY' as const,
            points: 10,
            answer: '0',
            timeLimit: 60,
            options: JSON.stringify([
                {
                    question: 'Which HTML element specifies a footer for a document or section?',
                    options: ['<footer>', '<bottom>', '<end>', '<foot>'],
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
    console.log('✅ Seeded HTML quizzes!');
}

// ... (rest of the code remains unchanged)
        // 2. Ensure challenge types exist for HTML
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

        let codeChallengeType = await db.query.challengeTypes.findFirst({
            where: eq(challengeTypes.name, 'Code Challenge')
        });
        if (!codeChallengeType) {
            const inserted = await db.insert(challengeTypes).values({
                name: 'Code Challenge',
                description: 'Write code to solve a problem',
                quizCategoryId: htmlCategory.id
            }).returning();
            codeChallengeType = inserted[0];
        }

        let identificationType = await db.query.challengeTypes.findFirst({
            where: eq(challengeTypes.name, 'Identification')
        });
        if (!identificationType) {
            const inserted = await db.insert(challengeTypes).values({
                name: 'Identification',
                description: 'Identify the correct HTML element or attribute',
                quizCategoryId: htmlCategory.id
            }).returning();
            identificationType = inserted[0];
        }

        let timeTrialType = await db.query.challengeTypes.findFirst({
            where: eq(challengeTypes.name, 'Time Trial')
        });
        if (!timeTrialType) {
            const inserted = await db.insert(challengeTypes).values({
                name: 'Time Trial',
                description: 'Complete the task within a time limit',
                quizCategoryId: htmlCategory.id
            }).returning();
            timeTrialType = inserted[0];
        }

        // 3. Prepare easy HTML quizzes (Multiple Choice)
        const easyHtmlQuizzes = [
            {
                title: 'What does HTML stand for?',
                description: 'Basic HTML question.',
                explanation: 'HTML stands for HyperText Markup Language.',
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
                title: 'Which HTML element is used for the largest heading?',
                description: 'Heading elements.',
                explanation: '<h1> is the largest heading element.',
                difficulty: 'EASY' as const,
                points: 10,
                answer: '0',
                timeLimit: 60,
                options: JSON.stringify([
                    {
                        question: 'Which HTML element is used for the largest heading?',
                        options: ['<h1>', '<heading>', '<h6>', '<head>'],
                        correctAnswer: 0
                    }
                ]),
                quizCategoryId: htmlCategory.id,
                challengeTypeId: mcType.id
            },
            {
                title: 'Which tag is used to create a hyperlink in HTML?',
                description: 'Hyperlink tag.',
                explanation: '<a> tag is used for hyperlinks.',
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
                description: 'Image accessibility.',
                explanation: 'The alt attribute provides alternative text for images.',
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
                title: 'What is the correct HTML element for inserting a line break?',
                description: 'Line break tag.',
                explanation: '<br> element inserts a line break.',
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
            },
            {
                title: 'Which HTML element defines a paragraph?',
                description: 'Paragraph element.',
                explanation: '<p> element defines a paragraph.',
                difficulty: 'EASY' as const,
                points: 10,
                answer: '2',
                timeLimit: 60,
                options: JSON.stringify([
                    {
                        question: 'Which HTML element defines a paragraph?',
                        options: ['<para>', '<text>', '<p>', '<br>'],
                        correctAnswer: 2
                    }
                ]),
                quizCategoryId: htmlCategory.id,
                challengeTypeId: mcType.id
            },
            {
                title: 'What is the correct HTML for adding a background color?',
                description: 'Background color.',
                explanation: 'Background color is typically set using CSS, but inline styles or the bgcolor attribute (deprecated) could be used.',
                difficulty: 'EASY' as const,
                points: 10,
                answer: '3',
                timeLimit: 60,
                options: JSON.stringify([
                    {
                        question: 'What is the correct HTML for adding a background color?',
                        options: ['<body color="yellow">', '<background>yellow</background>', '<bgcolor>yellow</bgcolor>', '<body style="background-color:yellow;">'],
                        correctAnswer: 3
                    }
                ]),
                quizCategoryId: htmlCategory.id,
                challengeTypeId: mcType.id
            },
            {
                title: 'Which HTML element specifies a footer for a document or section?',
                description: 'Footer element.',
                explanation: '<footer> element specifies a footer.',
                difficulty: 'EASY' as const,
                points: 10,
                answer: '0',
                timeLimit: 60,
                options: JSON.stringify([
                    {
                        question: 'Which HTML element specifies a footer for a document or section?',
                        options: ['<footer>', '<bottom>', '<end>', '<foot>'],
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
        console.log('✅ Seeded HTML quizzes!');
}

// Run cleaning and seeding
(async () => {
    await seedHtmlQuizzes();
    })();
})(); 