import { Separator } from "@/components/ui/separator";
import AllResources from "@/components/AllResources";
import { getCurrentUser } from "@/lib/current-user";
import AllocateResourceButton from "@/components/AllocateResourceButton";
import EncryptedHeading from "@/components/EncryptedHeading";

export default async function resourcesPage() {
    const user = await getCurrentUser();

    if (user?.role === "Student") {
        return (
            <div className="flex items-center justify-center h-full max-w-8xl">
                <h1 className="text-5xl font-extrabold">
                    Students are not allowed to access this page.
                </h1>
            </div>
        );
    }

    return (
        <>
            <div className="mt-18 flex flex-col max-w-7xl items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-left">
                    <EncryptedHeading text="View Resources" />
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-4">
                    Browse currently available inventory for events and operations.
                </p>
                <div className="mt-6">
                    <AllocateResourceButton />
                </div>

                <Separator className="my-6" />
            </div>
            <AllResources />
        </>
    );
}
