import ManageEventsTable from "@/components/ManageEventsTable";
import { Separator } from "@/components/ui/separator";
import { extractUserFullInfo } from "@/Queries/Users"

// 1. Add searchParams to the page props
export default async function manage({
  searchParams,
}: {
  searchParams: Promise<{ society?: string }>;
}) {
    const user = await extractUserFullInfo();

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
            <div className="mt-18 flex flex-col max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold text-left">
                    Manage Societies
                </h1>

                <Separator className="my-6" />
                
                <ManageEventsTable searchParams={searchParams} />
            </div>
        </>
    )
}