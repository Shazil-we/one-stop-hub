import { Separator } from "@/components/ui/separator";
import SettingsProfileForm from "@/components/SettingsProfileForm";
import { extractRequestsByUserID } from "@/Queries/Requests";
import { extractUserFullInfo } from "@/Queries/Users";

export default async function Settings() {
    const user = await extractUserFullInfo();

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full max-w-7xl">
                <h1 className="text-5xl font-extrabold ">
                    Please sign in to access settings.
                </h1>
            </div>
        );
    }

    const requestHistory = await extractRequestsByUserID(user.user_id);

    return (
        <>
            <div className="mt-18 flex flex-col max-w-7xl items-center justify-center">
                <h1 className="text-5xl md:text-7xl font-extrabold text-left">
                    Settings
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-4">
                    Manage your profile and request additional access roles.
                </p>
                <Separator className="my-6" />

                <SettingsProfileForm
                    fullName={user.full_name}
                    email={user.email}
                    role={user.role}
                    requestHistory={requestHistory}
                />
            </div>
        </>
    );
}