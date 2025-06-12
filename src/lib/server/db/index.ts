import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Use environment variable for database URL, fallback to local file
const databaseUrl = process.env.DATABASE_URL || 'file:zen.db';

const client = createClient({
	url: databaseUrl,
});

// Merge schema and tables
const mergedSchema = {
	...schema,
	
};

export const db = drizzle(client, { schema: mergedSchema });
