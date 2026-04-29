import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { extractVenueBookings } from "@/Queries/Venue_Bookings";
import VenueInput from "./VenueInput";
import BookingRowActions from "./BookingRowActions";

export default async function ManageVenueBookingsTable({
    searchParams,
}: {
    searchParams: Promise<{ venue?: string }>;
}) {
    const resolvedParams = await searchParams;
    const venueFilter = resolvedParams?.venue?.toLowerCase() || "";

    const allBookings = await extractVenueBookings();
    const filteredBookings = allBookings.filter((booking) =>
        booking.venue_id.toLowerCase().includes(venueFilter)
    );
    const bookingCols = ["Booking Id", "Event Id", "Venue Id", "Status", "Reviewed By", "Actions"];

    return (
        <>
            <div className="flex-col mt-12 hidden md:flex w-full max-w-4xl">
                <div className="flex items-center justify-between">
                    <VenueInput />
                </div>
                <Table className="mt-8">
                    <TableCaption>All Venue Bookings</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {bookingCols.map((col, index) => (
                                <TableHead key={index}>{col}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBookings.map((booking, index) => (
                            <TableRow key={index}>
                                <TableCell>{booking.booking_id}</TableCell>
                                <TableCell>{booking.event_id}</TableCell>
                                <TableCell>{booking.venue_id}</TableCell>
                                <TableCell>{booking.approval_status}</TableCell>
                                <TableCell>{booking.reviewed_by_admin_id || "-"}</TableCell>
                                <TableCell><BookingRowActions booking={booking} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
