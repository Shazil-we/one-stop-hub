"use server";

import { executeSQL } from "@/lib/db";

export interface Resource {
  resource_id: string;
  item_name: string;
  total_inventory: number;
}

export async function extractResources() {
  const query = `SELECT resource_id, item_name, total_inventory FROM resources`;
  const result = await executeSQL(query, []);
  return result.rows as Resource[];
}
export async function extractResourceById(id: string) {
    const query = `SELECT resource_id, name, total_inventory FROM resources WHERE resource_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as Resource) || null;
  }
