"use server";

import { executeSQL } from "@/lib/db";

export interface EventRegistration {
  registration_id: string;
  event_id: string;
  user_id: string;
}

export async function extractEventRegistrations() {
  const query = `SELECT registration_id, event_id, user_id FROM event_registrations`;
  const result = await executeSQL(query, []);
  return result.rows as EventRegistration[];
}
export async function extractEventRegistrationById(id: string) {
    const query = `SELECT registration_id, event_id, user_id FROM event_registrations WHERE registration_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as EventRegistration) || null;
}

