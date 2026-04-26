import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { fetchAllEvents } from "@/Queries/Events"
import EventInput from "./EventInput";
import ManageEventsButton from "./ManageEventsButton";

export default async function ManageEventsTable({
    searchParams,
}: {
    searchParams: Promise<{ society?: string }>;
}) {
    const resolvedParams = await searchParams;
    const Sname = resolvedParams?.society || "";
    const AllEvents = await fetchAllEvents(Sname);
    const EventsCols = ["Event Id", "Event Name", "Society Name", "Event Date", "Venue Name", "Status"];

    return (
        <>
            <div className="flex-col mt-12 hidden md:flex">
                <div className="flex items-center justify-between">
                    <EventInput />
                    <ManageEventsButton/>
                </div>
                <Table className="mt-8">
                    <TableCaption>All Current Events</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {EventsCols.map((col, index) => (
                                <TableHead key={index} className=""> {col} </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {AllEvents.map((Event, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{Event.event_id}</TableCell>
                                    <TableCell>{Event.event_name}</TableCell>
                                    <TableCell>{Event.society_name}</TableCell>
                                    <TableCell>{Event.event_date}</TableCell>
                                    <TableCell>{Event.venue_name}</TableCell>
                                    <TableCell>{Event.status}</TableCell>
                                </TableRow>
                            )
                        })}     
                    </TableBody>
                </Table>
            </div>
        </>
    )
}