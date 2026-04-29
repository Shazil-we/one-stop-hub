"use server"
import { extractUserID, extractUserFullInfo } from "@/Queries/Users"
import { fetchManagedSocietyID, extractSocietyIDByName } from "@/Queries/Societies" 
import { createEvent,extractEventID } from "@/Queries/Events"
import { requestVenueBooking } from "@/Queries/Venue_Bookings"
import { extractVenueByName } from "@/Queries/Venues"
export async function createEventAction(formData: FormData) {
  const eventName = formData.get("eventName") as string;
  const eventDescription = formData.get("eventDescription") as string;
  const venueName = formData.get("venueName") as string;
  const eventDateRaw = formData.get("eventDate") as string;

  if (!eventName || !eventDateRaw || !venueName) {
      return { success: false, error: "Missing required fields" };
  }

  const user = await extractUserFullInfo();
  if (!user) return { success: false, error: "Not logged in" };

  let society;
  if (user.role === "Administrator") {
      const societyName = formData.get("societyName") as string;
      society = await extractSocietyIDByName(societyName);
  } else if (user.role === "SocietyHead") {
      const userID = await extractUserID();
      society = await fetchManagedSocietyID(userID);
  } else {
      return { success: false, error: "Students cannot create events" };
  }

  const venue_id = await extractVenueByName(venueName);
  if (!society || !venue_id) {
      return { success: false, error: "Society or venue not found" };
  }

  await createEvent(
      eventName,
      eventDescription,
      eventDateRaw,
      society.society_id,
      venue_id,
  );

  const eventID = await extractEventID(eventName, venue_id);
  await requestVenueBooking(eventID, venue_id);

  return { success: true };
}