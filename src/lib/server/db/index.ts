import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const client = createClient({
	url: 'file:zen.db',
});

// Merge schema and tables
const mergedSchema = {
	...schema,
	
};

export const db = drizzle(client, { schema: mergedSchema });
