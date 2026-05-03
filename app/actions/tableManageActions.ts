"use server";

import { revalidatePath } from "next/cache";
import { deleteEvent, updateEventDetails } from "@/Queries/Events";
import { deleteResource, updateResource } from "@/Queries/Resources";
import { deleteVenue, updateVenue } from "@/Queries/Venues";
import { deleteSociety, updateSociety } from "@/Queries/Societies";
import { deleteUserByUserID, extractUserFullInfo, updateUserByUserID } from "@/Queries/Users";
import { deleteRequest, updateRequest } from "@/Queries/Requests";
import { deleteVenueBooking, updateBookingStatus } from "@/Queries/Venue_Bookings";
import { deleteAllocation, updateResourceAllocation } from "@/Queries/Resource_Allocations";
import { extractSocHeadIDByEmail } from "@/Queries/Users";

async function requireNonStudent() {
    const user = await extractUserFullInfo();
    if (!user || user.role === "Student") {
        throw new Error("Not authorized");
    }
    return user;
}

async function requireAdmin() {
    const user = await extractUserFullInfo();
    if (!user || user.role !== "Administrator") {
        throw new Error("Not authorized");
    }
    return user;
}

export async function updateVenueRowAction(formData: FormData) {
    await requireNonStudent();
    const venueId = String(formData.get("venueId"));
    const venueName = String(formData.get("venueName"));
    const capacity = Number(formData.get("capacity"));
    const locationBuilding = String(formData.get("locationBuilding"));
    const venueType = String(formData.get("venueType"));
    await updateVenue(venueId, venueName, capacity, locationBuilding, venueType);
    revalidatePath("/dashboard/venues/manage", "page");
    revalidatePath("/dashboard/venues", "page");
}

export async function deleteVenueRowAction(venueId: string) {
    await requireNonStudent();
    await deleteVenue(venueId);
    revalidatePath("/dashboard/venues/manage", "page");
    revalidatePath("/dashboard/venues", "page");
}

export async function updateResourceRowAction(formData: FormData) {
    await requireNonStudent();
    const resourceId = String(formData.get("resourceId"));
    const itemName = String(formData.get("itemName"));
    const totalInventory = Number(formData.get("totalInventory"));
    await updateResource(resourceId, itemName, totalInventory);
    revalidatePath("/dashboard/resources/manage", "page");
    revalidatePath("/dashboard/resources", "page");
}

export async function deleteResourceRowAction(resourceId: string) {
    await requireNonStudent();
    await deleteResource(resourceId);
    revalidatePath("/dashboard/resources/manage", "page");
    revalidatePath("/dashboard/resources", "page");
}

export async function updateEventRowAction(formData: FormData) {
    const user = await requireAdmin();
    const eventId = String(formData.get("eventId"));
    const eventName = String(formData.get("eventName"));
    const eventDescription = String(formData.get("eventDescription"));
    const eventDate = String(formData.get("eventDate"));
    await updateEventDetails(eventId, eventName, eventDescription, eventDate);
    revalidatePath("/dashboard/events/manage", "page");
    revalidatePath("/dashboard/events", "page");
    revalidatePath("/dashboard/venues/manage-bookings", "page");
}

export async function deleteEventRowAction(eventId: string) {
    await requireAdmin();
    await deleteEvent(eventId);
    revalidatePath("/dashboard/events/manage", "page");
    revalidatePath("/dashboard/events", "page");
}

export async function updateSocietyRowAction(formData: FormData) {
    await requireNonStudent();
    const societyId = String(formData.get("societyId"));
    const societyName = String(formData.get("societyName"));
    const description = String(formData.get("description"));
    const societyHeadEmail = String(formData.get("societyHeadEmail"));

    let headId: string | null = null;
    if (societyHeadEmail && societyHeadEmail.trim() !== "") {
        const head = await extractSocHeadIDByEmail(societyHeadEmail.trim());
        headId = head?.user_id ?? null;
    }

    await updateSociety(societyId, societyName, description, headId, null);
    revalidatePath("/dashboard/societies/manage", "page");
    revalidatePath("/dashboard/societies", "page");
}

export async function deleteSocietyRowAction(societyId: string) {
    await requireNonStudent();
    await deleteSociety(societyId);
    revalidatePath("/dashboard/societies/manage", "page");
    revalidatePath("/dashboard/societies", "page");
}

export async function updateUserRowAction(formData: FormData) {
    await requireAdmin();
    const userId = String(formData.get("userId"));
    const fullName = String(formData.get("fullName"));
    const email = String(formData.get("email"));
    const role = String(formData.get("role")) as "Student" | "SocietyHead" | "Administrator";
    await updateUserByUserID(userId, fullName, email, role);
    revalidatePath("/dashboard/settings/manage-user", "page");
    revalidatePath("/dashboard/settings", "page");
}

export async function deleteUserRowAction(userId: string) {
    await requireAdmin();
    await deleteUserByUserID(userId);
    revalidatePath("/dashboard/settings/manage-user", "page");
}

export async function updateRequestRowAction(formData: FormData) {
    await requireAdmin();
    const requestId = String(formData.get("requestId"));
    const requestedRole = String(formData.get("requestedRole")) as "Administrator" | "SocietyHead";
    const status = String(formData.get("status"));
    await updateRequest(requestId, requestedRole, status);
    revalidatePath("/dashboard/requests", "page");
    revalidatePath("/dashboard/settings", "page");
}

export async function deleteRequestRowAction(requestId: string) {
    await requireAdmin();
    await deleteRequest(requestId);
    revalidatePath("/dashboard/requests", "page");
}

export async function updateBookingRowAction(formData: FormData) {
    const admin = await requireAdmin();
    const bookingId = String(formData.get("bookingId"));
    const status = String(formData.get("status"));
    await updateBookingStatus(bookingId, status, admin.user_id);
    revalidatePath("/dashboard/venues/manage-bookings", "page");
}

export async function deleteBookingRowAction(bookingId: string) {
    await requireAdmin();
    await deleteVenueBooking(bookingId);
    revalidatePath("/dashboard/venues/manage-bookings", "page");
}

export async function updateAllocationRowAction(formData: FormData) {
    await requireAdmin();
    const allocationId = String(formData.get("allocationId"));
    const quantityRequested = Number(formData.get("quantityRequested"));
    const status = String(formData.get("status"));
    await updateResourceAllocation(allocationId, quantityRequested, status);
    revalidatePath("/dashboard/resources/manage-allocation", "page");
    revalidatePath("/dashboard/resources", "page");
}

export async function deleteAllocationRowAction(allocationId: string) {
    await requireAdmin();
    await deleteAllocation(allocationId);
    revalidatePath("/dashboard/resources/manage-allocation", "page");
}
