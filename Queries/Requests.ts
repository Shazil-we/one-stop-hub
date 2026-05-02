"use server";

import { executeSQL } from "@/lib/db";

export interface Requests {
  request_id: number;
  user_id: string;
  requested_role: "Administrator" | "SocietyHead";
  status: string;
  reviewed_by: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export interface RequestWithUser extends Requests {
  full_name: string;
  email: string;
}

export async function createRoleRequest(
  user_id: string,
  requested_role: "Administrator" | "SocietyHead"
) {
  const query = `
    INSERT INTO requests (user_id, requested_role, status)
    VALUES ($1, $2, 'Pending')
    RETURNING request_id, user_id, requested_role, status, reviewed_by, created_at, reviewed_at
  `;
  const result = await executeSQL(query, [user_id, requested_role]);
  return result.rows[0] as Requests;
}

export async function getPendingRoleRequest(
  user_id: string,
  requested_role: "Administrator" | "SocietyHead"
) {
  const query = `
    SELECT request_id, user_id, requested_role, status, reviewed_by, created_at, reviewed_at
    FROM requests
    WHERE user_id = $1
      AND requested_role = $2
      AND status = 'Pending'
    ORDER BY created_at DESC
    LIMIT 1
  `;
  const result = await executeSQL(query, [user_id, requested_role]);
  return (result.rows[0] as Requests) || null;
}

export async function extractRequestsByUserID(user_id: string) {
  const query = `
    SELECT request_id, user_id, requested_role, status, reviewed_by, created_at, reviewed_at
    FROM requests
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const result = await executeSQL(query, [user_id]);
  return result.rows as Requests[];
}

export async function extractAllRequests() {
  const query = `
    SELECT
      r.request_id,
      r.user_id,
      r.requested_role,
      r.status,
      r.reviewed_by,
      r.created_at,
      r.reviewed_at,
      u.full_name,
      u.email
    FROM requests r
    JOIN users u ON r.user_id = u.user_id
    ORDER BY
      CASE WHEN r.status = 'Pending' THEN 0 ELSE 1 END,
      r.created_at DESC
  `;
  const result = await executeSQL(query, []);
  return result.rows as RequestWithUser[];
}

export async function extractRequestById(request_id: string) {
  const query = `
    SELECT request_id, user_id, requested_role, status, reviewed_by, created_at, reviewed_at
    FROM requests
    WHERE request_id = $1
    LIMIT 1
  `;
  const result = await executeSQL(query, [request_id]);
  return (result.rows[0] as Requests) || null;
}

export async function approveRequest(request_id: string, reviewed_by: string) {
  const query = `
    UPDATE requests
    SET status = 'Approved',
        reviewed_by = $2,
        reviewed_at = NOW()
    WHERE request_id = $1
    RETURNING request_id, user_id, requested_role, status, reviewed_by, created_at, reviewed_at
  `;
  const result = await executeSQL(query, [request_id, reviewed_by]);
  return (result.rows[0] as Requests) || null;
}

export async function updateRequest(
  request_id: string,
  requested_role: "Administrator" | "SocietyHead",
  status: string
) {
  const query = `
    UPDATE requests
    SET requested_role = $1,
        status = $2
    WHERE request_id = $3
    RETURNING request_id, user_id, requested_role, status, reviewed_by, created_at, reviewed_at
  `;
  const result = await executeSQL(query, [requested_role, status, request_id]);
  return (result.rows[0] as Requests) || null;
}

export async function deleteRequest(request_id: string) {
  const query = `
    DELETE FROM requests
    WHERE request_id = $1
  `;
  await executeSQL(query, [request_id]);
}
