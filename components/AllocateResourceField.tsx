"use client";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createResourceAllocationAction } from "@/app/actions/resourceAllocationAction";

interface EventOption {
    event_id: string;
    event_name: string;
}

interface ResourceOption {
    resource_id: string;
    item_name: string;
    total_inventory: number;
}

export function AllocateResourceField({
    events,
    resources,
}: {
    events: EventOption[];
    resources: ResourceOption[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [eventId, setEventId] = useState("");
    const [resourceId, setResourceId] = useState("");

    const handleSubmit = async (formData: FormData) => {
        const result = await createResourceAllocationAction(formData);

        if (result.success) {
            setIsOpen(false);
            setEventId("");
            setResourceId("");
        } else {
            console.error("Failed to allocate resource:", result.error);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="ml-4">Allocate Resources</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Allocate Resources for Event</SheetTitle>
                </SheetHeader>

                <form action={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
                    <div className="grid gap-3">
                        <Label htmlFor="eventId">Event</Label>
                        <Select value={eventId} onValueChange={setEventId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select event" />
                            </SelectTrigger>
                            <SelectContent>
                                {events.map((event) => (
                                    <SelectItem key={event.event_id} value={event.event_id}>
                                        {event.event_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <input type="hidden" name="eventId" value={eventId} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="resourceId">Resource</Label>
                        <Select value={resourceId} onValueChange={setResourceId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select resource" />
                            </SelectTrigger>
                            <SelectContent>
                                {resources.map((resource) => (
                                    <SelectItem key={resource.resource_id} value={resource.resource_id}>
                                        {resource.item_name} (Stock: {resource.total_inventory})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <input type="hidden" name="resourceId" value={resourceId} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="quantityRequested">Quantity</Label>
                        <Input
                            id="quantityRequested"
                            name="quantityRequested"
                            type="number"
                            min={1}
                            placeholder="enter quantity to allocate"
                            required
                        />
                    </div>

                    <SheetFooter className="mt-6">
                        <Button type="submit">Submit Allocation</Button>
                        <SheetClose asChild>
                            <Button variant="outline" type="button">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
