import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { extractResourceAllocationRequests } from "@/Queries/Resource_Allocations";
import ApproveResourceAllocationCheckbox from "./ApproveResourceAllocationCheckbox";
import AllocationRowActions from "./AllocationRowActions";

export default async function ManageResourceAllocationTable() {
    const allocations = await extractResourceAllocationRequests();
    const allocationCols = [
        "Allocation Id",
        "Society",
        "Event",
        "Resource",
        "Quantity",
        "Status",
        "Approve",
        "Actions",
    ];

    return (
        <div className="flex-col mt-12 hidden md:flex w-full max-w-5xl">
            <Table className="mt-8">
                <TableCaption>All Resource Allocation Requests</TableCaption>
                <TableHeader>
                    <TableRow>
                        {allocationCols.map((col, index) => (
                            <TableHead key={index}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allocations.map((allocation) => {
                        const isPending = allocation.allocation_status === "Pending";
                        return (
                            <TableRow key={allocation.allocation_id}>
                                <TableCell>{allocation.allocation_id}</TableCell>
                                <TableCell>{allocation.society_name}</TableCell>
                                <TableCell>{allocation.event_name}</TableCell>
                                <TableCell>{allocation.item_name}</TableCell>
                                <TableCell>{allocation.quantity_requested}</TableCell>
                                <TableCell>{allocation.allocation_status}</TableCell>
                                <TableCell>
                                    <ApproveResourceAllocationCheckbox
                                        allocationId={allocation.allocation_id}
                                        approved={!isPending}
                                    />
                                </TableCell>
                                <TableCell><AllocationRowActions allocation={allocation} /></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
