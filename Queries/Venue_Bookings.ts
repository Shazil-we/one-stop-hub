"use server";

import { executeSQL } from "@/lib/db";

export interface VenueBooking {
  booking_id: string;
  event_id: string;
  venue_id: string;
  approval_status:string;
  reviewed_by_admin_id:string;
}

export async function extractVenueBookings() {
  const query = `
  SELECT booking_id, event_id, venue_id, approval_status,reviewed_by_admin_id 
  FROM venue_bookings`;
  const result = await executeSQL(query, []);
  return result.rows as VenueBooking[];
}
export async function extractVenueBookingById(id: string) {
    const query = `SELECT booking_id, event_id, venue_id, approval_status,reviewed_by_admin_id FROM venue_bookings WHERE booking_id = $1 LIMIT 1`;
    const result = await executeSQL(query, [id]);
    return (result.rows[0] as VenueBooking) || null;
  }

//Request Venue Booking
export async function requestVenueBooking(
  event_id: string,
  venue_id: string
) {
  const query = `
    INSERT INTO venue_bookings (event_id, venue_id, approval_status)
    VALUES ($1, $2, 'Pending')
    RETURNING *
  `;
  const result = await executeSQL(query, [event_id, venue_id]);
  return result.rows[0];
}

//update venue booking approval status
export async function updateBookingStatus(
  booking_id: string,
  status: string,
  admin_id: string
) {
  const query = `
    UPDATE venue_bookings
    SET approval_status = $1,
        reviewed_by_admin_id = $2
    WHERE booking_id = $3
    RETURNING *
  `;
  const result = await executeSQL(query, [status, admin_id, booking_id]);
  return result.rows[0];
}

//delete venue booking
export async function deleteVenueBooking(id: string) {
  const query = `
    DELETE FROM venue_bookings
    WHERE booking_id = $1
  `;
  await executeSQL(query, [id]);
}

//Check Venue Availability
export async function checkVenueAvailability(
  venue_id: string,
  booking_date: string
) {
  const query = `
    SELECT * 
    FROM venue_bookings
    WHERE venue_id = $1
      AND booking_date = $2
      AND approval_status = 'Approved'
  `;
  const result = await executeSQL(query, [venue_id, booking_date]);
  return result.rows.length === 0; // true = available
}

//fetch pending venue bookings
export async function getPendingVenueBookings() {
  const query = `
    SELECT 
      vb.booking_id,
      vb.approval_status,
      v.name AS venue_name,
      e.title AS event_name
    FROM venue_bookings vb
    JOIN venues v ON vb.venue_id = v.venue_id
    JOIN events e ON vb.event_id = e.event_id
    WHERE vb.approval_status = 'Pending'
  `;
  const result = await executeSQL(query, []);
  return result.rows;
}

//fetch society’s venue booking requests
export async function getSocietyVenueBookings(society_id: string) {
  const query = `
    SELECT 
      vb.booking_id,
      vb.approval_status,
      v.name AS venue_name,
      e.title AS event_name
    FROM venue_bookings vb
    JOIN venues v ON vb.venue_id = v.venue_id
    JOIN events e ON vb.event_id = e.event_id
    WHERE e.society_id = $1
  `;
  const result = await executeSQL(query, [society_id]);
  return result.rows;
}