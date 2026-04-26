"use server";

import { executeSQL } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export interface User {
  user_id: string;
  full_name: string;
  email: string;
  role: 'Student' | 'SocietyHead' | 'Admin';
  created_at: string;
  clerk_id: string;
}

export async function extractUserFullInfo() {
  const { userId } = await auth();
  if (!userId) return null;
  const query = `
  SELECT user_id, 
  full_name, email, role, created_at, clerk_id
  FROM users 
  WHERE clerk_id = $1 AND email = $2
  LIMIT 1`;
  const result = await executeSQL(query, [userId ]);
  return (result.rows[0] as User ) ;
}

export async function extractUserPublicInfo(id: string) {
    const query = `SELECT full_name, role FROM users WHERE user_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    
    // Use 'Partial<User>' so TypeScript knows some fields might be missing
    return (result.rows[0] as Partial<User>);
  }