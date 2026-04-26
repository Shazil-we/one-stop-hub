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
    WHERE venue_id = $1
    LIMIT 1
    `;
    const result = await executeSQL(query, [venueID])
    return (result.rows[0] as Venue) || null ;
}
export async function extractVenueByName(venueName:string){
  const query = 
  `
  SELECT venue_id
  FROM venues
  WHERE venue_name = $1
  LIMIT 1
  `;
  const result = await executeSQL(query, [venueName])
  return result.rows[0] as string ;
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
//create venue
export async function createVenue(
  venue_name: string,
  capacity: number,
  location_building: string,
  venue_type: string
) {
  const query = `
    INSERT INTO venues (venue_name, capacity, location_building, venue_type)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await executeSQL(query, [
    venue_name,
    capacity,
    location_building,
    venue_type,
  ]);
  return result.rows[0];
}

//update venues
export async function updateVenue(
  venue_id: string,
  venue_name: string,
  capacity: number,
  location_building: string,
  venue_type: string
) {
  const query = `
    UPDATE venues
    SET venue_name = $1,
        capacity = $2,
        location_building = $3,
        venue_type = $4
    WHERE venue_id = $5
    RETURNING *
  `;
  const result = await executeSQL(query, [
    venue_name,
    capacity,
    location_building,
    venue_type,
    venue_id,
  ]);
  return result.rows[0];
}

//delete venues
export async function deleteVenue(id: string) {
  const query = `
    DELETE FROM venues
    WHERE venue_id = $1
  `;
  await executeSQL(query, [id]);
}

//Fetch Venue Detail with Bookings 
export async function getVenueWithBookings(venueId: string) {
  const query = `
    SELECT 
      v.venue_name,
      v.capacity,
      v.location_building,
      v.venue_type,
      vb.approval_status
    FROM venues v
    LEFT JOIN venue_bookings vb 
      ON v.venue_id = vb.venue_id
    WHERE v.venue_id = $1
  `;
  const result = await executeSQL(query, [venueId]);
  return result.rows;
}