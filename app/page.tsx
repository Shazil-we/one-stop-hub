import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // 1. Check if the user has an active session
  const { userId } = await auth();

  // 2. If there is no user, force them to the dedicated login page
  if (!userId) {
    redirect("/sign-in");
  }

  // 3. If they are logged in, send them to the default dashboard
  // (Note: Later, we will add the raw SQL check here to route Admins vs Students)
  redirect("/student/dashboard");
}