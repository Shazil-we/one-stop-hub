"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createRoleRequest, getPendingRoleRequest } from "@/Queries/Requests";
import { extractUserFullInfo, updateUserNameByClerkID } from "@/Queries/Users";

export async function updateProfileNameAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be logged in." };
  }

  const fullName = (formData.get("fullName") as string)?.trim();
  if (!fullName) {
    return { success: false, error: "Name is required." };
  }

  await updateUserNameByClerkID(userId, fullName);
  revalidatePath("/dashboard/settings");

  return { success: true };
}

export async function requestRoleAction(formData: FormData) {
  const user = await extractUserFullInfo();
  if (!user) {
    return { success: false, error: "You must be logged in." };
  }

  const requestedRole = formData.get("requestedRole") as "Administrator" | "SocietyHead";
  if (!requestedRole || (requestedRole !== "Administrator" && requestedRole !== "SocietyHead")) {
    return { success: false, error: "Invalid role selected." };
  }

  if (user.role === requestedRole) {
    return { success: false, error: "You already have this role." };
  }

  const pendingRequest = await getPendingRoleRequest(user.user_id, requestedRole);
  if (pendingRequest) {
    return { success: false, error: "You already have a pending request for this role." };
  }

  await createRoleRequest(user.user_id, requestedRole);
  revalidatePath("/dashboard/settings");

  return { success: true };
}
