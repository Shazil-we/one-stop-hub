"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteResourceRowAction, updateResourceRowAction } from "@/app/actions/tableManageActions";

export default function ResourceRowActions({
    resource,
}: {
    resource: {
        resource_id: string;
        item_name: string;
        total_inventory: number;
    };
}) {
    return (
        <TableRowActionMenu
            sheetTitle="Edit Resource"
            onEditSubmit={updateResourceRowAction}
            onDelete={async () => deleteResourceRowAction(resource.resource_id)}
        >
            <input type="hidden" name="resourceId" value={resource.resource_id} />
            <div className="grid gap-2">
                <Label htmlFor={`item-${resource.resource_id}`}>Resource Name</Label>
                <Input id={`item-${resource.resource_id}`} name="itemName" defaultValue={resource.item_name} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`qty-${resource.resource_id}`}>Total Inventory</Label>
                <Input id={`qty-${resource.resource_id}`} name="totalInventory" type="number" defaultValue={resource.total_inventory} required />
            </div>
        </TableRowActionMenu>
    );
}
