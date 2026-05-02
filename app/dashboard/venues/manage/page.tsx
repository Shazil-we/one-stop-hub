import ManageVenueTable from "@/components/ManageVenueTable";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/current-user";
import EncryptedHeading from "@/components/EncryptedHeading";

export default async function manage({
    searchParams,
}: {
    searchParams: Promise<{ venue?: string }>;
}) {
    const user = await getCurrentUser();

    if (user?.role === "Student") {
        return (
            <div className="flex items-center justify-center h-full max-w-8xl">
                <h1 className="text-5xl font-extrabold ">
                    Students are not allowed to access this page.
                </h1>
            </div>
        )
    }

    return (
        <>
            <div className="mt-18 flex flex-col max-w-7xl items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold">
                    <EncryptedHeading text="Manage Venues" />
                </h1>

                <Separator className="my-6" />

                <ManageVenueTable searchParams={searchParams} />
            </div>
        </>
    )
}
