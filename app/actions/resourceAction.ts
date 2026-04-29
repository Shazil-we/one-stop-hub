"use server";

import { createResource } from "@/Queries/Resources";

export async function createResourceAction(formData: FormData) {
    const itemName = formData.get("itemName") as string;
    const totalInventoryRaw = formData.get("totalInventory") as string;

    if (!itemName || !totalInventoryRaw) {
        return { success: false, error: "Missing required fields" };
    }

    const totalInventory = Number(totalInventoryRaw);
    if (Number.isNaN(totalInventory) || totalInventory < 0) {
        return { success: false, error: "Total inventory must be a valid number" };
    }

    await createResource(itemName, totalInventory);

    return { success: true };
}
