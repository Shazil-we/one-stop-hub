"use server"

import { createSociety } from "@/Queries/Societies" 
import { extractSocHeadIDByEmail } from "@/Queries/Users" 

export async function createSocietyAction(formData: FormData) {
  const societyName = formData.get("societyName") as string;
  const societyDescription = formData.get("societyDescription") as string;
  const headEmail = formData.get("HeadEmail") as string;
  const societyDateRaw = formData.get("societyDate") as string;

  if (!societyName || !societyDescription || !headEmail || !societyDateRaw) {
      return { success: false, error: "Missing required fields" };
  }

  const head = await extractSocHeadIDByEmail(headEmail);

  await createSociety(
      societyName,
      societyDescription,
      head.user_id,
      societyDateRaw
  );

  return { success: true };
}