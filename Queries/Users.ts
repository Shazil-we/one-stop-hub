"use server";

import { executeSQL } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export interface User {
  user_id: string;
  full_name: string;
  email: string;
  role: 'Student' | 'SocietyHead' | 'Administrator';
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
  WHERE clerk_id = $1
  LIMIT 1`;
  const result = await executeSQL(query, [userId]);
  return (result.rows[0] as User ) ;
}

export async function extractAllUsers() {
  const query = `
    SELECT user_id, full_name, email, role, created_at, clerk_id
    FROM users
    ORDER BY created_at DESC
  `;
  const result = await executeSQL(query, []);
  return result.rows as User[];
}

export async function updateUserNameByClerkID(clerk_id: string, full_name: string) {
  const query = `
    UPDATE users
    SET full_name = $1
    WHERE clerk_id = $2
    RETURNING user_id, full_name, email, role, created_at, clerk_id
  `;
  const result = await executeSQL(query, [full_name, clerk_id]);
  return (result.rows[0] as User) || null;
}

export async function updateUserRoleByUserID(
  user_id: string,
  role: "Student" | "SocietyHead" | "Administrator"
) {
  const query = `
    UPDATE users
    SET role = $1
    WHERE user_id = $2
    RETURNING user_id, full_name, email, role, created_at, clerk_id
  `;
  const result = await executeSQL(query, [role, user_id]);
  return (result.rows[0] as User) || null;
}

export async function updateUserByUserID(
  user_id: string,
  full_name: string,
  email: string,
  role: "Student" | "SocietyHead" | "Administrator"
) {
  const query = `
    UPDATE users
    SET full_name = $1,
        email = $2,
        role = $3
    WHERE user_id = $4
    RETURNING user_id, full_name, email, role, created_at, clerk_id
  `;
  const result = await executeSQL(query, [full_name, email, role, user_id]);
  return (result.rows[0] as User) || null;
}

export async function deleteUserByUserID(user_id: string) {
  const query = `
    DELETE FROM users
    WHERE user_id = $1
  `;
  await executeSQL(query, [user_id]);
}
export async function extractUserID(){
  const { userId } = await auth();
  const query = `SELECT user_id
  FROM users WHERE clerk_id = $1 
  LIMIT 1`;
  const result = await executeSQL(query, [userId]);
  return (result.rows[0] as string ) ;
}
export async function extractUserPublicInfo(id: string) {
    const query = `SELECT full_name, role FROM users WHERE user_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    
    // Use 'Partial<User>' so TypeScript knows some fields might be missing
    return (result.rows[0] as Partial<User>);
  }
  
export async function extractSocHeadIDByEmail(email:string){
  const query = `SELECT *
  FROM users 
  WHERE email = $1 AND role = 'SocietyHead' 
  LIMIT 1`;
  const result = await executeSQL(query, [email]);
  return (result.rows[0] as User ) ;
}