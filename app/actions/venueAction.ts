"use server"

import { createVenue } from "@/Queries/Venues";

export async function createVenueAction(formData: FormData) {
    const venueName = formData.get("venueName") as string;
    const capacityRaw = formData.get("capacity") as string;
    const locationBuilding = formData.get("locationBuilding") as string;
    const venueType = formData.get("venueType") as string;

    if (!venueName || !capacityRaw || !locationBuilding || !venueType) {
        return { success: false, error: "Missing required fields" };
    }

    const capacity = Number(capacityRaw);

    await createVenue(venueName, capacity, locationBuilding, venueType);

    return { success: true };
}
