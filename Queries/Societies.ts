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

export async function fetchAllSocieties() {
  const query = `
    SELECT 
      s.society_id,
      s.society_name,
      s.description,
      s.society_head_id,
      s.established_date,
      u.full_name AS head_name
    FROM societies s
    LEFT JOIN users u ON s.society_head_id = u.user_id
  `;
  const result = await executeSQL(query, []);
  return result.rows as Society[];
}

export async function fetchSocietyById(id: string) {
  const query = `
    SELECT 
      s.society_id,
      s.society_name,
      s.description,
      s.society_head_id,
      s.established_date,
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
      s.established_date
    FROM societies s
    WHERE s.society_head_id = $1
  `;
  const result = await executeSQL(query, [headId]);
  return result.rows as Society[];
}

export async function searchSocieties(search: string) {
  const query = `
    SELECT 
      s.society_id,
      s.society_name,
      s.description,
      s.society_head_id,
      s.established_date,
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
  headId: string,
  establishedDate: string
) {
  const query = `
    INSERT INTO societies (society_name, description, society_head_id, established_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await executeSQL(query, [name, description, headId, establishedDate]);
  return result.rows[0] as Society;
}

export async function updateSociety(
  id: string,
  name: string,
  description: string,
  headId: string
) {
  const query = `
    UPDATE societies
    SET 
      society_name = $1,
      description = $2,
      society_head_id = $3
    WHERE society_id = $4
    RETURNING *
  `;
  const result = await executeSQL(query, [name, description, headId, id]);
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