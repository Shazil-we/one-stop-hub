"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteAllocationRowAction, updateAllocationRowAction } from "@/app/actions/tableManageActions";

export default function AllocationRowActions({
    allocation,
}: {
    allocation: {
        allocation_id: string;
        quantity_requested: number;
        allocation_status: string;
    };
}) {
    return (
        <TableRowActionMenu
            sheetTitle="Edit Allocation"
            onEditSubmit={updateAllocationRowAction}
            onDelete={async () => deleteAllocationRowAction(allocation.allocation_id)}
        >
            <input type="hidden" name="allocationId" value={allocation.allocation_id} />
            <div className="grid gap-2">
                <Label htmlFor={`qty-${allocation.allocation_id}`}>Requested Quantity</Label>
                <Input
                    id={`qty-${allocation.allocation_id}`}
                    name="quantityRequested"
                    type="number"
                    defaultValue={allocation.quantity_requested}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`status-${allocation.allocation_id}`}>Status</Label>
                <Input
                    id={`status-${allocation.allocation_id}`}
                    name="status"
                    defaultValue={allocation.allocation_status}
                    required
                />
            </div>
        </TableRowActionMenu>
    );
}
