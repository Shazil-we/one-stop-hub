"use server";

import { executeSQL } from "@/lib/db";

export interface Society {
  society_id: number;
  society_name: string;
  description: string
  society_head_id: string;
  established_date:string;
  logo_base64: string | null;
}
export interface SocietyWithHeadName{
  society_id: number;
  society_name: string;
  description: string;
  society_head_id: string;
  established_date:string;
  society_head_name:string;
  society_head_email?:string;
  logo_base64: string | null;
}
export async function extractSocietiesFullInfo() {
  const query = `
  SELECT s.society_id, s.society_name, s.description, s.society_head_id, s.established_date, s.logo_base64, u.full_name AS society_head_name, u.email AS society_head_email
  FROM societies s
  LEFT JOIN users u on u.user_id = s.society_head_id
  `;
  const result = await executeSQL(query, []);
  return result.rows as SocietyWithHeadName[];
}

export async function extractSocietyById(id: number) {
    const query = `SELECT society_id, society_name, description, society_head_id, established_date, logo_base64 FROM societies WHERE society_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as Society) || null;
  }

export async function fetchAllSocieties() {
  const query = `
    SELECT 
      s.society_id,
      s.society_name,
      s.description,
      s.society_head_id,
      s.established_date,
      s.logo_base64,
      u.full_name AS head_name
    FROM societies s
    LEFT JOIN users u ON s.society_head_id = u.user_id
  `;
  const result = await executeSQL(query, []);
  return result.rows as Society[];
}

export async function fetchSocietyById(id: number) {
  const query = `
    SELECT 
      s.society_id,
      s.society_name,
      s.description,
      s.society_head_id,
      s.established_date,
      s.logo_base64,
      u.full_name AS head_name
    FROM societies s
    LEFT JOIN users u ON s.society_head_id = u.user_id
    WHERE s.society_id = $1
    LIMIT 1
  `;
  const result = await executeSQL(query, [id]);
  return result.rows[0] as Society || null;
}

export async function fetchManagedSocieties(headId: string) {
  const query = `
    SELECT 
      s.society_id,
      s.society_name,
      s.description,
      s.society_head_id,
      s.established_date,
      s.logo_base64
    FROM societies s
    WHERE s.society_head_id = $1
    LIMIT 1
  `;
  const result = await executeSQL(query, [headId]);
  return result.rows[0] as Society || null;
}
export async function extractSocietyIDByName(soc_name: string) {
  const query = `
    SELECT 
      *
    FROM societies s
    WHERE s.society_name = $1
    LIMIT 1
  `;
  const result = await executeSQL(query, [soc_name]);
  return result.rows[0] as Society;
}

export async function fetchManagedSocietyID(headId: string) {
  const query = `
    SELECT 
      *
    FROM societies s
    WHERE s.society_head_id = $1
    LIMIT 1
  `;
  const result = await executeSQL(query, [headId]);
  return result.rows[0] as Society;
}
export async function searchSocieties(search: string) {
  const query = `
    SELECT 
      s.society_id,
      s.society_name,
      s.description,
      s.society_head_id,
      s.established_date,
      s.logo_base64,
      u.full_name AS head_name
    FROM societies s
    LEFT JOIN users u ON s.society_head_id = u.user_id
    WHERE s.society_name ILIKE '%' || $1 || '%'
  `;
  const result = await executeSQL(query, [search]);
  return result.rows as Society[];
}

export async function createSociety(
  name: string,
  description: string,
  headId: string | null,
  establishedDate: string,
  logoBase64?: string | null
) {
  const query = `
    INSERT INTO societies (society_name, description, society_head_id, established_date, logo_base64)
    VALUES ($1, $2, $3, $4::DATE, $5)
  `;
  const result = await executeSQL(query, [name, description, headId, establishedDate, logoBase64 ?? null]);
  return result.rows[0] as Society;
}

export async function updateSociety(
  id: string,
  name: string,
  description: string,
  headId: string | null,
  logoBase64?: string | null
) {
  const query = `
    UPDATE societies
    SET 
      society_name = $1,
      description = $2,
      society_head_id = $3,
      logo_base64 = COALESCE($5, logo_base64)
    WHERE society_id = $4
  `;
  const result = await executeSQL(query, [name, description, headId, id, logoBase64 ?? null]);
  return result.rows[0] as Society;
}

export async function deleteSociety(id: string) {
  const query = `
    DELETE FROM societies
    WHERE society_id = $1
  `;
  await executeSQL(query, [id]);
  return { success: true };
}

export async function fetchSocietyCount(): Promise<number> {
  const query = `SELECT COUNT(*) AS count FROM societies`;
  const result = await executeSQL(query, []);
  return parseInt(result.rows[0].count, 10);
}