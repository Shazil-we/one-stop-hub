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