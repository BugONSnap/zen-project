import { db } from './index';
import { users, userRankings } from './schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// Function to handle schema changes
async function updateSchema() {
    try {
        // Check if uniqueInfo column exists by trying to select it
        try {
            await db.run(`
                SELECT unique_info FROM users LIMIT 1
            `);
            console.log('✅ uniqueInfo column already exists in users table');
        } catch (error) {
            // If the column doesn't exist, add it
            console.log('Adding uniqueInfo column to users table...');
            await db.run(`
                ALTER TABLE users 
                ADD COLUMN unique_info TEXT NOT NULL DEFAULT 'Not set'
            `);
            console.log('✅ Added uniqueInfo column to users table!');
        }
    } catch (error) {
        console.error('Error updating schema:', error);
        throw error;
    }
}

// Function to seed example users with unique recovery information
async function seedUsers() {
    // First, ensure we have a default rank
    let defaultRank = await db.query.userRankings.findFirst({
        where: eq(userRankings.rankName, 'Beginner')
    });
    
    if (!defaultRank) {
        const inserted = await db.insert(userRankings).values({
            rankName: 'Beginner',
            minPoints: 0,
            maxPoints: 100
        }).returning();
        defaultRank = inserted[0];
    }

    // Example users with unique recovery information
    const exampleUsers = [
        {
            username: 'john_doe',
            email: 'john@example.com',
            passwordHash: await bcrypt.hash('password123', 10),
            uniqueInfo: 'Favorite childhood pet: Max the dog',
            totalPoints: 0,
            rankId: defaultRank.id
        },
        {
            username: 'jane_smith',
            email: 'jane@example.com',
            passwordHash: await bcrypt.hash('securepass456', 10),
            uniqueInfo: 'First car: 2010 Toyota Camry',
            totalPoints: 0,
            rankId: defaultRank.id
        },
        {
            username: 'alex_dev',
            email: 'alex@example.com',
            passwordHash: await bcrypt.hash('devpass789', 10),
            uniqueInfo: 'Birth city: San Francisco',
            totalPoints: 0,
            rankId: defaultRank.id
        }
    ];

    // Insert users if they don't exist
    for (const user of exampleUsers) {
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, user.email)
        });

        if (!existingUser) {
            await db.insert(users).values(user);
        } else {
            // Update existing user's uniqueInfo if it's the default value
            if (existingUser.uniqueInfo === 'Not set') {
                await db.update(users)
                    .set({ uniqueInfo: user.uniqueInfo })
                    .where(eq(users.id, existingUser.id));
            }
        }
    }
    console.log('✅ Seeded example users with unique recovery information!');
}

// Run schema update and seeding
(async () => {
    await updateSchema();  // First update the schema
    await seedUsers();     // Then seed the data
})();
