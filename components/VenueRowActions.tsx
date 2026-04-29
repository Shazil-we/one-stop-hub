"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteVenueRowAction, updateVenueRowAction } from "@/app/actions/tableManageActions";

export default function VenueRowActions({
    venue,
}: {
    venue: {
        venue_id: string;
        venue_name: string;
        capacity: number;
        location_building: string;
        venue_type: string;
    };
}) {
    return (
        <TableRowActionMenu
            sheetTitle="Edit Venue"
            onEditSubmit={updateVenueRowAction}
            onDelete={async () => deleteVenueRowAction(venue.venue_id)}
        >
            <input type="hidden" name="venueId" value={venue.venue_id} />
            <div className="grid gap-2">
                <Label htmlFor={`venueName-${venue.venue_id}`}>Venue Name</Label>
                <Input id={`venueName-${venue.venue_id}`} name="venueName" defaultValue={venue.venue_name} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`capacity-${venue.venue_id}`}>Capacity</Label>
                <Input id={`capacity-${venue.venue_id}`} name="capacity" type="number" defaultValue={venue.capacity} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`location-${venue.venue_id}`}>Location</Label>
                <Input id={`location-${venue.venue_id}`} name="locationBuilding" defaultValue={venue.location_building} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`type-${venue.venue_id}`}>Type</Label>
                <Input id={`type-${venue.venue_id}`} name="venueType" defaultValue={venue.venue_type} required />
            </div>
        </TableRowActionMenu>
    );
}
