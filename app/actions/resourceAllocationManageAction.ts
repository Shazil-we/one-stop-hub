"use server";

import { revalidatePath } from "next/cache";
import {
    approveResourceAllocation,
    extractResourceAllocationById,
} from "@/Queries/Resource_Allocations";
import { extractResourceById, updateResource } from "@/Queries/Resources";
import { extractUserFullInfo } from "@/Queries/Users";

export async function approveResourceAllocationAction(allocationId: string) {
    if (!allocationId) {
        return { success: false, error: "Allocation id is required" };
    }

    const user = await extractUserFullInfo();
    if (!user || user.role !== "Administrator") {
        return { success: false, error: "Only admins can approve allocations" };
    }

    const allocation = await extractResourceAllocationById(allocationId);
    if (!allocation) {
        return { success: false, error: "Allocation request not found" };
    }

    if (allocation.allocation_status !== "Pending") {
        return { success: false, error: "Only pending requests can be approved" };
    }

    const resource = await extractResourceById(allocation.resource_id);
    if (!resource) {
        return { success: false, error: "Resource not found" };
    }

    if (resource.total_inventory < allocation.quantity_requested) {
        return { success: false, error: "Insufficient resource stock" };
    }

    await updateResource(
        resource.resource_id,
        resource.item_name,
        resource.total_inventory - allocation.quantity_requested
    );

    const updated = await approveResourceAllocation(allocationId);
    if (!updated) {
        return {
            success: false,
            error: "Unable to approve request.",
        };
    }

    revalidatePath("/dashboard/resources/manage-allocation");
    revalidatePath("/dashboard/resources");

    return { success: true };
}
