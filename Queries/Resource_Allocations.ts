"use server";

import { executeSQL } from "@/lib/db";

export interface ResourceAllocation {
  allocation_id: string;
  event_id: string;
  resource_id: string;
  quantity_requested: number;
  allocation_status:string;
}

export async function extractResourceAllocations() {
  const query = `SELECT allocation_id, event_id, resource_id, quantity_requested,allocation_status FROM resource_allocations`;
  const result = await executeSQL(query, []);
  return result.rows as ResourceAllocation[];
}
export async function extractResourceAllocationById(id: string) {
    const query = `SELECT allocation_id, event_id, resource_id, quantity_requested,allocation_status FROM resource_allocations WHERE allocation_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as ResourceAllocation) || null;
  }

  //request resource allocation
export async function requestResource(
  event_id: string,
  resource_id: string,
  quantity_requested: number
) {
  const query = `
    INSERT INTO resource_allocations (event_id, resource_id, quantity_requested, allocation_status)
    VALUES ($1, $2, $3, 'Pending')
    RETURNING *
  `;
  const result = await executeSQL(query, [event_id, resource_id, quantity_requested]);
  return result.rows[0];
}

//update resource allocation status
export async function updateAllocationStatus(
  allocation_id: string,
  status: string
) {
  const query = `
    UPDATE resource_allocations
    SET allocation_status = $1
    WHERE allocation_id = $2
    RETURNING *
  `;
  const result = await executeSQL(query, [status, allocation_id]);
  return result.rows[0];
}

//delete resource allocation
export async function deleteAllocation(id: string) {
  const query = `
    DELETE FROM resource_allocations
    WHERE allocation_id = $1
  `;
  await executeSQL(query, [id]);
}

//fetch pending requests
export async function getPendingAllocations() {
  const query = `
    SELECT 
      ra.allocation_id,
      ra.quantity_requested,
      ra.allocation_status,
      r.item_name,
      e.title AS event_name
    FROM resource_allocations ra
    JOIN resources r ON ra.resource_id = r.resource_id
    JOIN events e ON ra.event_id = e.event_id
    WHERE ra.allocation_status = 'Pending'
  `;
  const result = await executeSQL(query, []);
  return result.rows;
}

//Fetch Society’s Resource Requests
export async function getSocietyResourceRequests(society_id: string) {
  const query = `
    SELECT 
      ra.allocation_id,
      ra.quantity_requested,
      ra.allocation_status,
      r.item_name,
      e.title AS event_name
    FROM resource_allocations ra
    JOIN resources r ON ra.resource_id = r.resource_id
    JOIN events e ON ra.event_id = e.event_id
    WHERE e.society_id = $1
  `;
  const result = await executeSQL(query, [society_id]);
  return result.rows;
}