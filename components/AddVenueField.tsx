"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { createVenueAction } from "@/app/actions/venueAction";

export function AddVenueField() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        const result = await createVenueAction(formData);

        if (result.success) {
            setIsOpen(false);
        } else {
            console.error("Failed to create venue:", result.error);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="ml-4">Add Venue</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Venue</SheetTitle>
                </SheetHeader>

                <form action={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
                    <div className="grid gap-3">
                        <Label htmlFor="venueName">Venue Name</Label>
                        <Input id="venueName" name="venueName" placeholder="enter venue name" required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" name="capacity" type="number" min={1} placeholder="enter venue capacity" required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="locationBuilding">Location Building</Label>
                        <Input id="locationBuilding" name="locationBuilding" placeholder="enter building name" required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="venueType">Venue Type</Label>
                        <Input id="venueType" name="venueType" placeholder="enter venue type" required />
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
