import ManageResourceAllocationTable from "@/components/ManageResourceAllocationTable";
import { Separator } from "@/components/ui/separator";
import { extractUserFullInfo } from "@/Queries/Users";

export default async function manageResourceAllocationPage() {
    const user = await extractUserFullInfo();

    if (user?.role !== "Administrator") {
        return (
            <div className="flex items-center justify-center h-full max-w-8xl">
                <h1 className="text-5xl font-extrabold ">
                    Only administrators can access this page.
                </h1>
            </div>
        );
    }

    return (
        <>
            <div className="mt-18 flex flex-col max-w-7xl items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-left">
                    Manage Resource Allocations
                </h1>

                <Separator className="my-6" />

                <ManageResourceAllocationTable />
            </div>
        </>
    );
}
