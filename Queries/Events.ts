"use server";

import { executeSQL } from "@/lib/db";

export interface Event {
  event_id: string;
  event_name: string;
  event_description:string
  event_date: string;
  society_id: string;
  venue_id:string
  status: string;
}
export interface EventWithSociety extends Event {
    society_name: string;
  }
export async function extractEvents() {
  const query = `
  SELECT event_id, event_name, event_description,event_date,society_id,venue_id,status
  FROM events`;
  const result = await executeSQL(query, []);
  return result.rows as Event[];
}
export async function extractEventById(id: string) {
    const query = `SELECT event_id, event_name, event_description,event_date,society_id,venue_id,status FROM events WHERE event_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as Event) || null;
  }
export async function extractEventWithSocietyName(eventId: string) {
    const query = `
      SELECT e.*, s.name as society_name 
      FROM events e 
      JOIN societies s ON e.society_id = s.society_id 
      WHERE e.event_id = $1 
      LIMIT 1
    `;
    const result = await executeSQL(query, [eventId]);
    return (result.rows[0] as EventWithSociety) || null;
  }