"use server"

import { createSociety } from "@/Queries/Societies" 
import { extractSocHeadIDByEmail } from "@/Queries/Users" 

export async function createSocietyAction(formData: FormData) {
  const societyName = formData.get("societyName") as string;
  const societyDescription = formData.get("societyDescription") as string;
  const headEmail = formData.get("HeadEmail") as string;
  const societyDateRaw = formData.get("societyDate") as string;

  if (!societyName || !societyDescription || !societyDateRaw) {
      return { success: false, error: "Missing required fields" };
  }

  // Head email is optional — resolve to a user ID or leave null
  let headId: string | null = null;
  if (headEmail && headEmail.trim() !== "") {
    const head = await extractSocHeadIDByEmail(headEmail.trim());
    headId = head?.user_id ?? null;
  }

  await createSociety(
      societyName,
      societyDescription,
      headId,
      societyDateRaw,
      null // Logo upload removed, to be hardcoded later
  );

  return { success: true };
}