"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteRequestRowAction, updateRequestRowAction } from "@/app/actions/tableManageActions";

export default function RequestRowActions({
    request,
}: {
    request: {
        request_id: number;
        requested_role: "Administrator" | "SocietyHead";
        status: string;
    };
}) {
    return (
        <TableRowActionMenu
            sheetTitle="Edit Request"
            onEditSubmit={updateRequestRowAction}
            onDelete={async () => deleteRequestRowAction(String(request.request_id))}
        >
            <input type="hidden" name="requestId" value={request.request_id} />
            <div className="grid gap-2">
                <Label htmlFor={`requestedRole-${request.request_id}`}>Requested Role</Label>
                <Input
                    id={`requestedRole-${request.request_id}`}
                    name="requestedRole"
                    defaultValue={request.requested_role}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`requestStatus-${request.request_id}`}>Status</Label>
                <Input id={`requestStatus-${request.request_id}`} name="status" defaultValue={request.status} required />
            </div>
        </TableRowActionMenu>
    );
}
