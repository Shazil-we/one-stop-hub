"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteBookingRowAction, updateBookingRowAction } from "@/app/actions/tableManageActions";

export default function BookingRowActions({
    booking,
}: {
    booking: {
        booking_id: string;
        approval_status: string;
    };
}) {
    return (
        <TableRowActionMenu
            sheetTitle="Edit Booking"
            onEditSubmit={updateBookingRowAction}
            onDelete={async () => deleteBookingRowAction(booking.booking_id)}
        >
            <input type="hidden" name="bookingId" value={booking.booking_id} />
            <div className="grid gap-2">
                <Label htmlFor={`bookingStatus-${booking.booking_id}`}>Status</Label>
                <Input
                    id={`bookingStatus-${booking.booking_id}`}
                    name="status"
                    defaultValue={booking.approval_status}
                    required
                />
            </div>
        </TableRowActionMenu>
    );
}
