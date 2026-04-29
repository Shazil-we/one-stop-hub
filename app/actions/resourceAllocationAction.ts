"use server";

import { requestResource } from "@/Queries/Resource_Allocations";
import { fetchSocietyEvents } from "@/Queries/Events";
import { fetchManagedSocietyID } from "@/Queries/Societies";
import { extractUserFullInfo } from "@/Queries/Users";

export async function createResourceAllocationAction(formData: FormData) {
    const eventId = formData.get("eventId") as string;
    const resourceId = formData.get("resourceId") as string;
    const quantityRaw = formData.get("quantityRequested") as string;

    if (!eventId || !resourceId || !quantityRaw) {
        return { success: false, error: "Missing required fields" };
    }

    const quantityRequested = Number(quantityRaw);
    if (Number.isNaN(quantityRequested) || quantityRequested < 1) {
        return { success: false, error: "Quantity must be at least 1" };
    }

    const user = await extractUserFullInfo();
    if (!user) return { success: false, error: "Not logged in" };

    if (user.role !== "SocietyHead") {
        return { success: false, error: "Only Society Heads can allocate resources" };
    }

    const managedSociety = await fetchManagedSocietyID(user.user_id);
    if (!managedSociety) {
        return { success: false, error: "No managed society found for this user" };
    }

    const societyEvents = await fetchSocietyEvents(String(managedSociety.society_id));
    const requestedEvent = societyEvents.find((event) => String(event.event_id) === eventId);
    if (!requestedEvent) {
        return { success: false, error: "You can only allocate resources for your own events" };
    }

    await requestResource(eventId, resourceId, quantityRequested);
    return { success: true };
}
