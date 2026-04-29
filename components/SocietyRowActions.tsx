"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteSocietyRowAction, updateSocietyRowAction } from "@/app/actions/tableManageActions";

export default function SocietyRowActions({
    society,
}: {
    society: {
        society_id: number;
        society_name: string;
        description: string;
        society_head_id: string;
        society_head_name: string;
    };
}) {
    return (
        <TableRowActionMenu
            sheetTitle="Edit Society"
            onEditSubmit={updateSocietyRowAction}
            onDelete={async () => deleteSocietyRowAction(String(society.society_id))}
        >
            <input type="hidden" name="societyId" value={society.society_id} />
            <div className="grid gap-2">
                <Label htmlFor={`societyName-${society.society_id}`}>Society Name</Label>
                <Input id={`societyName-${society.society_id}`} name="societyName" defaultValue={society.society_name} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`societyDescription-${society.society_id}`}>Description</Label>
                <Input
                    id={`societyDescription-${society.society_id}`}
                    name="description"
                    defaultValue={society.description}
                    required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`societyHeadId-${society.society_id}`}>Society Head User ID</Label>
                <Input
                    id={`societyHeadId-${society.society_id}`}
                    name="societyHeadId"
                    defaultValue={society.society_head_id}
                    required
                />
            </div>
        </TableRowActionMenu>
    );
}
