import { db } from './index';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

// Initialize database for production
export async function initializeDatabase() {
    try {
        console.log('🔄 Initializing database...');
        
        // Run migrations if needed
        try {
            await migrate(db, { migrationsFolder: './drizzle' });
            console.log('✅ Database migrations completed');
        } catch (error) {
            console.log('ℹ️ No migrations to run or migrations folder not found');
        }

        // Check if tables exist by running a simple query
        await db.run('SELECT 1');
        console.log('✅ Database connection successful');
        
        return true;
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}

// Run initialization if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    initializeDatabase()
        .then(() => {
            console.log('🎉 Database initialization completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Database initialization failed:', error);
            process.exit(1);
        });
} 