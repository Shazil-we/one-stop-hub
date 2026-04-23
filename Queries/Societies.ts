"use server";

import { executeSQL } from "@/lib/db";

export interface Society {
  society_id: string;
  society_name: string;
  description: string
  society_head_id: string;
  established_date:string;
}

export async function extractSocietiesFullInfo() {
  const query = `
  SELECT society_id, society_name, description ,society_head_id , established_date
  FROM societies`;
  const result = await executeSQL(query, []);
  return result.rows as Society[];
}
export async function extractSocietyById(id: string) {
    const query = `SELECT society_id, society_name, description ,society_head_id, established_date,FROM societies WHERE society_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as Society) || null;
  }