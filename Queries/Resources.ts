"use server";

import { executeSQL } from "@/lib/db";

export interface Resource {
  resource_id: string;
  item_name: string;
  total_inventory: number;
}

// Fetch all resources
export async function extractResources() {
<<<<<<< Updated upstream
  const query = `
    SELECT resource_id, item_name, total_inventory 
    FROM resources
  `;
=======
  const query = `SELECT * FROM resources`;
>>>>>>> Stashed changes
  const result = await executeSQL(query, []);
  return result.rows as Resource[];
}

// Fetch resource by IDs
export async function extractResourceById(id: string) {
<<<<<<< Updated upstream
  const query = `
    SELECT resource_id, item_name, total_inventory 
    FROM resources 
    WHERE resource_id = $1 
    LIMIT 1
  `;
  const result = await executeSQL(query, [id]);
  return (result.rows[0] as Resource) || null;
}
//create resource
export async function createResource(
  item_name: string,
  total_inventory: number
) {
  const query = `
    INSERT INTO resources (item_name, total_inventory)
    VALUES ($1, $2)
    RETURNING *
  `;
  const result = await executeSQL(query, [item_name, total_inventory]);
  return result.rows[0];
}

//update resource
export async function updateResource(
  id: string,
  item_name: string,
  total_inventory: number
) {
  const query = `
    UPDATE resources
    SET item_name = $1, total_inventory = $2
    WHERE resource_id = $3
    RETURNING *
  `;
  const result = await executeSQL(query, [item_name, total_inventory, id]);
  return result.rows[0];
}
//delete resource
export async function deleteResource(id: string) {
  const query = `
    DELETE FROM resources
    WHERE resource_id = $1
  `;
  await executeSQL(query, [id]);
}

//fetch available inventory for a resource
export async function getAvailableResources() {
  const query = `
    SELECT 
      r.resource_id,
      r.item_name,
      r.total_inventory - COALESCE(SUM(ra.quantity), 0) AS available_inventory
    FROM resources r
    LEFT JOIN resource_allocations ra 
      ON r.resource_id = ra.resource_id 
      AND ra.status = 'Approved'
    GROUP BY r.resource_id
  `;
  const result = await executeSQL(query, []);
  return result.rows;
=======
    const query = `SELECT resource_id, name, total_inventory FROM resources WHERE resource_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as Resource) || null;
  }

export async function FetchAllResources(id: string) {
    const query = `SELECT resource_id, name, total_inventory FROM resources WHERE resource_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as Resource) || null;
>>>>>>> Stashed changes
}