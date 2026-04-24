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

export async function registerForEvent(userId: string, eventId: string) {
  const query = `
    INSERT INTO event_registrations (user_id, event_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const result = await executeSQL(query, [userId, eventId]);
  return result.rows[0] as EventRegistration;
}

export async function fetchUserTickets(userId: string) {
  const query = `
    SELECT 
      e.event_id,
      e.event_name,
      e.event_date
    FROM event_registrations er
    JOIN events e ON er.event_id = e.event_id
    WHERE er.user_id = $1
    AND e.event_date >= CURRENT_DATE
    ORDER BY e.event_date ASC
  `;
  const result = await executeSQL(query, [userId]);
  return result.rows as UserTicket[];
}

export async function fetchEventRoster(eventId: string) {
  const query = `
    SELECT 
      u.user_id,
      u.full_name,
      u.email
    FROM event_registrations er
    JOIN users u ON er.user_id = u.user_id
    WHERE er.event_id = $1
  `;
  const result = await executeSQL(query, [eventId]);
  return result.rows as EventRoster[];
}

export async function fetchRegistrationCount(eventId: string) {
  const query = `
    SELECT COUNT(*) AS total
    FROM event_registrations
    WHERE event_id = $1
  `;
  const result = await executeSQL(query, [eventId]);
  return Number(result.rows[0]?.total || 0);
}

export async function checkRegistrationStatus(
  userId: string,
  eventId: string
) {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM event_registrations
      WHERE user_id = $1 AND event_id = $2
    ) AS registered
  `;
  const result = await executeSQL(query, [userId, eventId]);
  return result.rows[0]?.registered as boolean;
}

export async function cancelRegistration(
  userId: string,
  eventId: string
) {
  const query = `
    DELETE FROM event_registrations
    WHERE user_id = $1 AND event_id = $2
  `;
  await executeSQL(query, [userId, eventId]);
  return { success: true };
}
