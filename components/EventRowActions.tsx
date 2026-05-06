"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteEventRowAction, updateEventRowAction } from "@/app/actions/tableManageActions";

export default function EventRowActions({
    event,
}: {
    event: {
        event_id: number;
        event_name: string;
        event_description: string;
        event_date: string;
    };
}) {
    return (
        <TableRowActionMenu
            sheetTitle="Edit Event"
            onEditSubmit={updateEventRowAction}
            onDelete={async () => deleteEventRowAction(String(event.event_id))}
        >
                
            <input type="hidden" name="eventId" value={event.event_id} />
            <div className="grid gap-2">
                <Label htmlFor={`eventName-${event.event_id}`}>Event Name</Label>
                <Input id={`eventName-${event.event_id}`} name="eventName" defaultValue={event.event_name} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`eventDescription-${event.event_id}`}>Description</Label>
                <Textarea
                    id={`eventDescription-${event.event_id}`}
                    name="eventDescription"
                    defaultValue={event.event_description}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`eventDate-${event.event_id}`}>Event Date</Label>
                <Input
                    id={`eventDate-${event.event_id}`}
                    name="eventDate"
                    type="date"
                    defaultValue={new Date(event.event_date).toISOString().slice(0, 10)}
                    required
                />
            </div>
        </TableRowActionMenu>
    );
}
