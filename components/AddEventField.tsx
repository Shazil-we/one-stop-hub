"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { DatePickerInput } from "./Datepicker"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { createEventAction } from "@/app/actions/eventActions"

// Add a prop interface so the component knows the user's role
export function AddEventField({ userRole }: { userRole: string }) {
    console.log("The role received by AddEventField is:", userRole);
    const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        if (eventDate) {
            formData.append("eventDate", eventDate.toISOString());
        }

        const result = await createEventAction(formData);

        if (result.success) {
            setIsOpen(false);
        } else {
            console.error("Failed to create event:", result.error);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="ml-4">Add Event</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Event</SheetTitle>
                </SheetHeader>

                <form action={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
                    <div className="grid gap-3">
                        <Label htmlFor="eventName">Event Name</Label>
                        <Input id="eventName" name="eventName" placeholder="enter event name" required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="eventDescription">Event Description</Label>
                        <Textarea id="eventDescription" name="eventDescription" placeholder="enter event details" required />
                    </div>

                    {userRole == "Administrator" && (
                        <div className="grid gap-3">
                            <Label htmlFor="societyName">Society Name</Label>
                            <Input id="societyName" name="societyName" placeholder="enter society name" required />
                        </div>
                    )}

                    <div className="grid gap-3">
                        <DatePickerInput
                            selectedDate={eventDate}
                            onDateChange={setEventDate}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="venueName">Venue Name</Label>
                        <Input id="venueName" name="venueName" placeholder="enter Venue Name" required />
                    </div>

                    <SheetFooter className="mt-6">
                        <Button type="submit">Save changes</Button>
                        <SheetClose asChild>
                            <Button variant="outline" type="button">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}