import { db } from './index';
import { users, quizCategories, challengeTypes, quizzes, userRankings } from './schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function seed() {
    try {
        console.log('🌱 Starting database seed...');

        // Create user rankings
        console.log('Creating user rankings...');
        const ranks = await db.insert(userRankings).values([
            { rankName: 'Beginner', minPoints: 0, maxPoints: 100 },
            { rankName: 'Intermediate', minPoints: 101, maxPoints: 500 },
            { rankName: 'Advanced', minPoints: 501, maxPoints: 1000 },
            { rankName: 'Expert', minPoints: 1001, maxPoints: null }
        ]).returning();

        // Create quiz categories
        console.log('Creating quiz categories...');
        const categories = await db.insert(quizCategories).values([
            { name: 'HTML' },
            { name: 'CSS' },
            { name: 'JavaScript' }
        ]).returning();

        // Create challenge types
        console.log('Creating challenge types...');
        const challenges = await db.insert(challengeTypes).values([
            // HTML Challenge Types
            { name: 'Multiple Choice', description: 'Choose the correct answer from multiple options', quizCategoryId: categories[0].id },
            { name: 'Code Challenge', description: 'Write code to solve a problem', quizCategoryId: categories[0].id },
            { name: 'Identification', description: 'Identify the correct HTML element or attribute', quizCategoryId: categories[0].id },
            { name: 'Time Trial', description: 'Complete the task within a time limit', quizCategoryId: categories[0].id },
            { name: 'Complete the Code', description: 'Fill in the missing parts of the code', quizCategoryId: categories[0].id },
            
            // CSS Challenge Types
            { name: 'Multiple Choice', description: 'Choose the correct answer from multiple options', quizCategoryId: categories[1].id },
            { name: 'Code Challenge', description: 'Write code to solve a problem', quizCategoryId: categories[1].id },
            { name: 'Identification', description: 'Identify the correct CSS property or value', quizCategoryId: categories[1].id },
            { name: 'Time Trial', description: 'Complete the task within a time limit', quizCategoryId: categories[1].id },
            { name: 'Complete the Code', description: 'Fill in the missing parts of the code', quizCategoryId: categories[1].id },
            
            // JavaScript Challenge Types
            { name: 'Multiple Choice', description: 'Choose the correct answer from multiple options', quizCategoryId: categories[2].id },
            { name: 'Code Challenge', description: 'Write code to solve a problem', quizCategoryId: categories[2].id },
            { name: 'Identification', description: 'Identify the correct JavaScript concept or syntax', quizCategoryId: categories[2].id },
            { name: 'Time Trial', description: 'Complete the task within a time limit', quizCategoryId: categories[2].id },
            { name: 'Complete the Code', description: 'Fill in the missing parts of the code', quizCategoryId: categories[2].id }
        ]).returning();

        // Create sample quizzes
        console.log('Creating sample quizzes...');
        await db.insert(quizzes).values([
            // HTML Quizzes
            {
                challengeTypeId: challenges[0].id, // Multiple Choice
                quizCategoryId: categories[0].id,
                title: 'HTML Basics Quiz',
                description: 'Test your knowledge of HTML fundamentals',
                points: 10,
                answer: '0',
                explanation: 'HTML stands for Hyper Text Markup Language',
                difficulty: 'EASY',
                timeLimit: 300,
                options: JSON.stringify([
                    'Hyper Text Markup Language',
                    'High Tech Modern Language',
                    'Hyper Transfer Markup Language',
                    'Hyper Text Modern Language'
                ])
            },
            {
                challengeTypeId: challenges[2].id, // Identification
                quizCategoryId: categories[0].id,
                title: 'HTML Elements Identification',
                description: 'Identify the correct HTML element for the given purpose',
                points: 15,
                answer: '1',
                explanation: 'The <p> tag is used for paragraphs in HTML',
                difficulty: 'EASY',
                timeLimit: 60,
                options: JSON.stringify([
                    'div',
                    'p',
                    'span',
                    'text'
                ])
            },
            {
                challengeTypeId: challenges[4].id, // Complete the Code
                quizCategoryId: categories[0].id,
                title: 'Complete the HTML Structure',
                description: 'Fill in the missing parts of this HTML structure',
                points: 20,
                answer: '<!DOCTYPE html><html><head><title>My Page</title></head><body><h1>Hello World</h1></body></html>',
                explanation: 'A basic HTML document requires DOCTYPE, html, head, and body tags',
                difficulty: 'EASY',
                timeLimit: 300,
                options: null
            },
            // CSS Quizzes
            {
                challengeTypeId: challenges[5].id, // Multiple Choice
                quizCategoryId: categories[1].id,
                title: 'CSS Basics Quiz',
                description: 'Test your knowledge of CSS fundamentals',
                points: 10,
                answer: '1',
                explanation: 'The # symbol is used to select elements by their ID',
                difficulty: 'EASY',
                timeLimit: 300,
                options: JSON.stringify([
                    '.class',
                    '#id',
                    'element',
                    '*'
                ])
            },
            {
                challengeTypeId: challenges[7].id, // Identification
                quizCategoryId: categories[1].id,
                title: 'CSS Properties Identification',
                description: 'Identify the correct CSS property for the given style',
                points: 15,
                answer: '0',
                explanation: 'color is used to set the text color in CSS',
                difficulty: 'EASY',
                timeLimit: 60,
                options: JSON.stringify([
                    'color',
                    'text-color',
                    'font-color',
                    'text-style'
                ])
            },
            {
                challengeTypeId: challenges[9].id, // Complete the Code
                quizCategoryId: categories[1].id,
                title: 'Complete the CSS Style',
                description: 'Fill in the missing CSS properties',
                points: 20,
                answer: 'color: blue; font-size: 16px;',
                explanation: 'Basic CSS properties for text styling',
                difficulty: 'EASY',
                timeLimit: 300,
                options: null
            },
            // JavaScript Quizzes
            {
                challengeTypeId: challenges[10].id, // Multiple Choice
                quizCategoryId: categories[2].id,
                title: 'JavaScript Basics Quiz',
                description: 'Test your knowledge of JavaScript fundamentals',
                points: 10,
                answer: '2',
                explanation: 'const is used to declare a constant variable in JavaScript',
                difficulty: 'EASY',
                timeLimit: 300,
                options: JSON.stringify([
                    'var x = 5;',
                    'let x = 5;',
                    'const x = 5;',
                    'x = 5;'
                ])
            },
            {
                challengeTypeId: challenges[12].id, // Identification
                quizCategoryId: categories[2].id,
                title: 'JavaScript Concepts Identification',
                description: 'Identify the correct JavaScript concept',
                points: 15,
                answer: '1',
                explanation: 'An array is a collection of elements in JavaScript',
                difficulty: 'EASY',
                timeLimit: 60,
                options: JSON.stringify([
                    'Object',
                    'Array',
                    'Function',
                    'Variable'
                ])
            },
            {
                challengeTypeId: challenges[14].id, // Complete the Code
                quizCategoryId: categories[2].id,
                title: 'Complete the JavaScript Function',
                description: 'Fill in the missing parts of this JavaScript function',
                points: 20,
                answer: 'function greet(name) { return "Hello, " + name + "!"; }',
                explanation: 'Basic JavaScript function declaration and string concatenation',
                difficulty: 'EASY',
                timeLimit: 300,
                options: null
            }
        ]);

        // Check if test user exists before creating
        console.log('Checking for existing test user...');
        const existingUser = await db.select().from(users).where(eq(users.email, 'test@example.com')).limit(1);
        
        if (existingUser.length === 0) {
            console.log('Creating test user...');
            const hashedPassword = await bcrypt.hash('test123', 10);
            await db.insert(users).values({
                username: 'testuser',
                email: 'test@example.com',
                passwordHash: hashedPassword,
                totalPoints: 0,
                rankId: ranks[0].id
            });
        } else {
            console.log('Test user already exists, skipping creation...');
        }

        console.log('✅ Database seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}

async function updateQuizOptions() {
    // Example: Update quiz with id=1 (HTML Basics Quiz)
    await db.update(quizzes)
        .set({
            options: JSON.stringify([
                {
                    id: 1,
                    question: "What does HTML stand for?",
                    options: [
                        "Hyper Text Markup Language",
                        "High Tech Modern Language",
                        "Hyper Transfer Markup Language",
                        "Hyper Text Modern Language"
                    ],
                    correctAnswer: 0
                },
                {
                    id: 2,
                    question: "Which HTML element is used for creating a hyperlink?",
                    options: [
                        "<link>",
                        "<a>",
                        "<href>",
                        "<url>"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 3,
                    question: "What is the correct HTML element for the largest heading?",
                    options: [
                        "<heading>",
                        "<h1>",
                        "<head>",
                        "<header>"
                    ],
                    correctAnswer: 1
                },
                {
                    id: 4,
                    question: "Which tag is used to create a line break in HTML?",
                    options: [
                        "<break>",
                        "<br>",
                        "<lb>",
                        "<line>"
                    ],
                    correctAnswer: 1
                }
            ])
        })
        .where(eq(quizzes.id, 1)); // Update the quiz with id=1

    // Repeat for other quizzes as needed, changing the id and questions

    console.log('Quiz options updated!');
}

async function updateCompleteTheCodeQuiz() {
    await db.update(quizzes)
        .set({
            options: JSON.stringify([
                {
                    id: 1,
                    question: "Fill in the missing parts of this HTML structure:",
                    starterCode: "<!DOCTYPE html>\n<html>\n<head>\n<title>My Page</title>\n</head>\n<body>\n<h1>Hello World</h1>\n</body>\n</html>",
                    correctAnswer: "<!DOCTYPE html><html><head><title>My Page</title></head><body><h1>Hello World</h1></body></html>"
                }
            ])
        })
        .where(eq(quizzes.id, 3));
    console.log('Updated Complete the HTML Structure quiz options!');
}

// Run the seed function
seed();
updateQuizOptions();
updateCompleteTheCodeQuiz(); 