"use server"
import { extractUserID, extractUserFullInfo } from "@/Queries/Users"
import { fetchManagedSocietyID, extractSocietyIDByName } from "@/Queries/Societies" 
import { createEvent } from "@/Queries/Events"
import { extractVenueByName } from "@/Queries/Venues"
export async function createEventAction(formData: FormData) {
  try {
    const eventName = formData.get("eventName") as string;
    const eventDescription = formData.get("eventDescription") as string;
    const venueName = formData.get("venueName") as string;
    const eventDateRaw = formData.get("eventDate") as string;
    
    if (!eventName || !eventDateRaw || !venueName) {
        return { success: false, error: "Missing required fields" };
    }
    const user = await extractUserFullInfo();
    if (!user) return { success: false, error: "Not logged in" };
    let society_id;
    if (user.role === "Administrator") {
        const societyName = formData.get("societyName") as string;
        if (!societyName) return { success: false, error: "Society name required for Admins" };
        
        society_id = await extractSocietyIDByName(societyName); 
    } 
    else if (user.role === "SocietyHead") {
        const userID = await extractUserID();
        society_id = await fetchManagedSocietyID(userID);
    } 
    else {
        return { success: false, error: "Students cannot create events" };
    }
    if (!society_id) return { success: false, error: "Society not found" };
    const venue_id = await extractVenueByName(venueName);
    if (!venue_id) return { success: false, error: "Venue not found" };
    await createEvent(
        eventName,
        eventDescription,
        eventDateRaw,
        society_id,
        venue_id, 
    );
    return { success: true };
  } catch (error) {
    console.error("Action error:", error);
    return { success: false, error: "Database error" };
  }
}