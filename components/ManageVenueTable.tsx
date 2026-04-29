import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { extractVenues } from "@/Queries/Venues";
import VenueInput from "./VenueInput";
import ManageVenueButton from "./ManageVenueButton";
import VenueRowActions from "./VenueRowActions";

export default async function ManageVenueTable({
    searchParams,
}: {
    searchParams: Promise<{ venue?: string }>;
}) {
    const resolvedParams = await searchParams;
    const venueNameFilter = resolvedParams?.venue?.toLowerCase() || "";

    const allVenues = await extractVenues();
    const filteredVenues = allVenues.filter((venue) =>
        venue.venue_name.toLowerCase().includes(venueNameFilter)
    );
    const venueCols = ["Venue Id", "Venue Name", "Capacity", "Location", "Venue Type", "Actions"];

    return (
        <>
            <div className="flex-col w-full max-w-4xl mt-12 hidden md:flex">
                <div className="flex items-center justify-between">
                    <VenueInput />
                    <ManageVenueButton />
                </div>
                <Table className="mt-8 w-full">
                    <TableCaption>All Current Venues</TableCaption>
                    <TableHeader>
                        <TableRow>
                            {venueCols.map((col, index) => (
                                <TableHead key={index} className="text-left font-bold">{col}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredVenues.map((venue, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{venue.venue_id}</TableCell>
                                    <TableCell>{venue.venue_name}</TableCell>
                                    <TableCell>{venue.capacity}</TableCell>
                                    <TableCell>{venue.location_building}</TableCell>
                                    <TableCell>{venue.venue_type}</TableCell>
                                    <TableCell><VenueRowActions venue={venue} /></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
