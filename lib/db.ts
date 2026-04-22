import { Pool } from 'pg';

// Initialise the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Helper function to execute queries
export const executeSQL = (text: string, params?: any[]) => pool.query(text, params);


