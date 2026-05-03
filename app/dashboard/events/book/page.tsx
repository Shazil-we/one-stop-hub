import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/lib/current-user";
import EncryptedHeading from "@/components/EncryptedHeading";
import { AddEventField } from "@/components/AddEventField";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Info } from "lucide-react";

export default async function Book() {
    const user = await getCurrentUser();

    if (user?.role === "Student") {
        return (
            <div className="flex items-center justify-center h-full max-w-7xl">
                <h1 className="text-5xl font-extrabold ">
                    Page Access Denied.
                </h1>
            </div>
        )
    }

    return (
        <div className="mt-18 flex flex-col max-w-7xl items-center justify-start w-full">
            <h1 className="text-5xl md:text-7xl font-extrabold text-left w-full text-center">
                <EncryptedHeading text="Book an Event" />
            </h1>

            <Separator className="my-6 w-full" />

            <div className="flex flex-col items-center justify-center space-y-12 mt-12 w-full px-4">
                <div className="text-center max-w-2xl space-y-4">
                    <h2 className="text-3xl font-semibold tracking-tight">Ready to host your next big event?</h2>
                    <p className="text-muted-foreground text-lg">
                        Use this portal to officially register and book your society's upcoming event. Make sure you have all the necessary details prepared.
                    </p>
                </div>

                <div className="p-8 border rounded-xl bg-card text-card-foreground shadow-sm w-full max-w-2xl flex flex-col items-center gap-6">
                    <div className="bg-primary/10 p-4 rounded-full">
                        <CalendarPlus className="w-12 h-12 text-primary" />
                    </div>
                    
                    <div className="text-center">
                        <h3 className="font-medium text-xl mb-2">Create New Event</h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">
                            Fill out the event form with all the required details. You will need to specify the event name, date, venue, and a comprehensive description.
                        </p>
                    </div>

                    <AddEventField 
                        userRole={user!.role} 
                        customTrigger={
                            <Button size="lg" className="w-full sm:w-auto text-lg px-12 py-6 h-auto mt-4 rounded-full shadow-lg hover:shadow-xl transition-all">
                                <CalendarPlus className="mr-2 w-6 h-6" />
                                Book Event
                            </Button>
                        } 
                    />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                    <Info className="w-4 h-4" />
                    <p>Only society heads and administrators are authorized to book new events.</p>
                </div>
            </div>
        </div>
    )
}