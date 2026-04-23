"use server";

import { executeSQL } from "@/lib/db";

export interface Venue {
  venue_id: string;
  venue_name: string;
  capacity: number;
  location_building:string;
  venue_type:string;
}

export async function extractVenues() {
  const query = `
  SELECT venue_id, venue_name, capacity, location_building, venue_type
  FROM venues`;
  const result = await executeSQL(query, []);
  return result.rows as Venue[];
}

export async function extractVenueByID(venueID:string){
    const query = 
    `
    SELECT venue_id, venue_name, capacity,location_building, venue_type
    FROM venues
    WHERE venueID = $1 
    LIMIT 1
    `;
    const result = await executeSQL(query, [venueID])
    return (result.rows as Venue[]) || null ;
}

export async function extractVenueStats(venueId: string) {
    const query = `
      SELECT 
        v.venue_name, 
        (SELECT 
        COUNT(*) 
        FROM venue_bookings
        WHERE venue_id = v.venue_id) AS total_bookings
      FROM venues v
      WHERE v.venue_id = $1
      LIMIT 1
    `;
    const result = await executeSQL(query, [venueId]);
    return (result.rows[0] as Partial<Venue>); 
  }