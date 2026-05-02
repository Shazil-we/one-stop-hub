"use server";

import { revalidatePath } from "next/cache";
import { approveRequest, extractRequestById } from "@/Queries/Requests";
import { extractUserFullInfo, updateUserRoleByUserID } from "@/Queries/Users";

export async function approveRequestAction(requestId: string) {
    if (!requestId) {
        return { success: false, error: "Request id is required" };
    }

    const admin = await extractUserFullInfo();
    if (!admin || admin.role !== "Administrator") {
        return { success: false, error: "Only admins can approve requests" };
    }

    const request = await extractRequestById(requestId);
    if (!request) {
        return { success: false, error: "Request not found" };
    }

    if (request.status !== "Pending") {
        return { success: false, error: "Only pending requests can be approved" };
    }

    await updateUserRoleByUserID(
        request.user_id,
        request.requested_role as "SocietyHead" | "Administrator"
    );
    await approveRequest(requestId, admin.user_id);

    revalidatePath("/dashboard/requests", "page");
    revalidatePath("/dashboard/settings", "page");

    return { success: true };
}
