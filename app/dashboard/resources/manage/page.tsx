import ManageResourceTable from "@/components/ManageResourceTable";
import { Separator } from "@/components/ui/separator";
import { extractUserFullInfo } from "@/Queries/Users";

export default async function manage({
    searchParams,
}: {
    searchParams: Promise<{ resource?: string }>;
}) {
    const user = await extractUserFullInfo();

    if (user?.role === "Student") {
        return (
            <div className="flex items-center justify-center h-full max-w-8xl">
                <h1 className="text-5xl font-extrabold ">
                    Students are not allowed to access this page.
                </h1>
            </div>
        );
    }

    return (
        <>
            <div className="mt-18 flex flex-col max-w-7xl items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold">
                    Manage Resources
                </h1>

                <Separator className="my-6" />

                <ManageResourceTable searchParams={searchParams} />
            </div>
        </>
    );
}
