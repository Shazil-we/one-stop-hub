import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { executeSQL } from "@/lib/db"; // Adjust this import to match where your DB connection is

export default async function StudentDashboard() {
  // 1. Get the securely authenticated user from Clerk
  const user = await currentUser();

  // 2. If they aren't logged in, bounce them out
  if (!user) {
    redirect("/sign-in");
  }

  // 3. Extract their details
  const email = user.emailAddresses[0]?.emailAddress;
  const fullName = user.username;

  // 4. The ONE-STOP-HUB Sync Query (Runs instantly when they load the page)
  const syncSql = `
    INSERT INTO users (user_id, full_name, email, role) 
    VALUES ($1, $2, $3, 'Student') 
    ON CONFLICT (user_id) DO NOTHING;
  `;
  
  try {
    await executeSQL(syncSql, [user.id, fullName, email]);
  } catch (error) {
    console.error("Failed to sync to Neon:", error);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p>Welcome, {fullName}. Your account is officially synced.</p>
      
      {/* Your actual dashboard content goes here later */}
    </div>
  );
}