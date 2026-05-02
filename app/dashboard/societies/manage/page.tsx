import ManageEventsTable from "@/components/ManageEventsTable";
import ManageSocietyTable from "@/components/ManageSocietyTable";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/current-user"
import EncryptedHeading from "@/components/EncryptedHeading";

// 1. Add searchParams to the page props
export default async function manage({
  searchParams,
}: {
  searchParams: Promise<{ society?: string }>;
}) {
    const user = await getCurrentUser();

    if (user?.role === "Student") {
        return (
            <div className="flex items-center justify-center h-full max-w-7xl">
                <h1 className="text-5xl font-extrabold ">
                    Students are not allowed to access this page.
                </h1>
            </div>
        )
    }

    return (
        <>
            <div className="mt-18 flex flex-col max-w-7xl items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-left">
                    <EncryptedHeading text="Manage Societies" />
                </h1>

                <Separator className="my-6" />
                
                <ManageSocietyTable searchParams={searchParams} />
            </div>
        </>
    )
}