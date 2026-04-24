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

export async function fetchUpcomingEvents() {
  const query = `
    SELECT 
      e.event_id,
      e.event_name,
      e.event_description,
      e.event_date,
      e.society_id,
      e.venue_id,
      e.status,
      s.society_name
    FROM events e
    JOIN societies s ON e.society_id = s.society_id
    WHERE e.event_date >= CURRENT_DATE
    ORDER BY e.event_date ASC
  `;
  const result = await executeSQL(query, []);
  return result.rows as EventWithSociety[];
}

export async function fetchEventDetails(eventId: string) {
  const query = `
    SELECT 
      e.event_id,
      e.event_name,
      e.event_description,
      e.event_date,
      e.society_id,
      e.venue_id,
      e.status,
      s.society_name
    FROM events e
    JOIN societies s ON e.society_id = s.society_id
    WHERE e.event_id = $1
    LIMIT 1
  `;
  const result = await executeSQL(query, [eventId]);
  return (result.rows[0] as EventWithSociety) || null;
}

export async function fetchSocietyEvents(societyId: string) {
  const query = `
    SELECT 
      event_id,
      event_name,
      event_description,
      event_date,
      society_id,
      venue_id,
      status
    FROM events
    WHERE society_id = $1
    ORDER BY event_date DESC
  `;
  const result = await executeSQL(query, [societyId]);
  return result.rows as Event[];
}

export async function fetchPastEvents() {
  const query = `
    SELECT 
      e.event_id,
      e.event_name,
      e.event_description,
      e.event_date,
      e.society_id,
      e.venue_id,
      e.status,
      s.society_name
    FROM events e
    JOIN societies s ON e.society_id = s.society_id
    WHERE e.event_date < CURRENT_DATE
    ORDER BY e.event_date DESC
  `;
  const result = await executeSQL(query, []);
  return result.rows as EventWithSociety[];
}

export async function fetchEventsByStatus(status: string) {
  const query = `
    SELECT 
      e.event_id,
      e.event_name,
      e.event_description,
      e.event_date,
      e.society_id,
      e.venue_id,
      e.status,
      s.society_name
    FROM events e
    JOIN societies s ON e.society_id = s.society_id
    WHERE e.status = $1
  `;
  const result = await executeSQL(query, [status]);
  return result.rows as EventWithSociety[];
}

export async function createEvent(
  name: string,
  description: string,
  date: string,
  societyId: string,
  venueId: string
) {
  const query = `
    INSERT INTO events (
      event_name,
      event_description,
      event_date,
      society_id,
      venue_id,
      status
    )
    VALUES ($1, $2, $3, $4, $5, 'Draft')
    RETURNING *
  `;
  const result = await executeSQL(query, [
    name,
    description,
    date,
    societyId,
    venueId,
  ]);
  return result.rows[0] as Event;
}

export async function updateEventDetails(
  eventId: string,
  name: string,
  description: string,
  date: string
) {
  const query = `
    UPDATE events
    SET 
      event_name = $1,
      event_description = $2,
      event_date = $3
    WHERE event_id = $4
    RETURNING *
  `;
  const result = await executeSQL(query, [
    name,
    description,
    date,
    eventId,
  ]);
  return result.rows[0] as Event;
}

export async function updateEventStatus(
  eventId: string,
  status: string
) {
  const query = `
    UPDATE events
    SET status = $1
    WHERE event_id = $2
    RETURNING *
  `;
  const result = await executeSQL(query, [status, eventId]);
  return result.rows[0] as Event;
}

export async function deleteEvent(eventId: string) {
  const query = `
    DELETE FROM events
    WHERE event_id = $1
  `;
  await executeSQL(query, [eventId]);
  return { success: true };
}