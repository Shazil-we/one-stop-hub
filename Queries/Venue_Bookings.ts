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
  