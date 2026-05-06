import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { executeSQL } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { AppSidebar } from "@/components/app-sidebar";
import { STUDENT_NAV, ADMINISTRATOR_NAV, SOCIETYHEAD_NAV } from "@/data/Dashboarddata";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0]?.emailAddress;
  const fullName = user.fullName || "User";

  const syncSql = `
    INSERT INTO users (clerk_id, full_name, email, role) 
    VALUES ($1, $2, $3, 'Student') 
    ON CONFLICT (email) DO UPDATE SET clerk_id = EXCLUDED.clerk_id;
  `;

  try {
    await executeSQL(syncSql, [user.id, fullName, email]);
  } catch (error) {
    console.error("Failed to sync to Neon:", error);
  }

  const dbUser = await getCurrentUser();
  
  const sidebarUser = {
    name: dbUser?.full_name || fullName,
    email: email,
    avatar: "",
    role: dbUser?.role || "Student"
  };

  const NavITEMS = 
    sidebarUser.role === "Administrator" ? ADMINISTRATOR_NAV : 
    sidebarUser.role === "SocietyHead" ? SOCIETYHEAD_NAV : 
    STUDENT_NAV;
  return (
    <SidebarProvider>
      <AppSidebar user={sidebarUser} />
      <SidebarInset>
        <header className="flex h-16 w-7xl shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 fixed backdrop-blur-xl z-100 max-w-8xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">One-Stop-Hub</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{sidebarUser.role} Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children} 
        </main>

      </SidebarInset>
    </SidebarProvider>
  );
}