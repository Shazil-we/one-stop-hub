import ManageRequestsTable from "@/components/ManageRequestsTable";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/current-user";
import EncryptedHeading from "@/components/EncryptedHeading";

export default async function requestsPage() {
    const user = await getCurrentUser();

    if (user?.role !== "Administrator") {
        return (
            <div className="flex items-center justify-center h-full max-w-7xl">
                <h1 className="text-5xl font-extrabold ">
                    Page Access Denied.
                </h1>
            </div>
        );
    }

    return (
        <>
            <div className="mt-18 flex flex-col max-w-7xl items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-left">
                    <EncryptedHeading text="Manage Requests" />
                </h1>

                <Separator className="my-6" />

                <ManageRequestsTable />
            </div>
        </>
    );
}
