"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteSocietyRowAction, updateSocietyRowAction } from "@/app/actions/tableManageActions";
import { ImageIcon, Upload, X } from "lucide-react";

export default function SocietyRowActions({
    society,
}: {
    society: {
        society_id: number;
        society_name: string;
        description: string;
        society_head_id: string;
        society_head_name: string;
        society_head_email?: string;
        logo_base64: string | null;
    };
}) {
    const handleSubmit = async (formData: FormData) => {
        return updateSocietyRowAction(formData);
    };

    return (
        <TableRowActionMenu
            sheetTitle="Edit Society"
            onEditSubmit={handleSubmit}
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
                <Label htmlFor={`societyHeadEmail-${society.society_id}`}>
                    Society Head Email
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                    id={`societyHeadEmail-${society.society_id}`}
                    name="societyHeadEmail"
                    defaultValue={society.society_head_email || ""}
                    placeholder="leave blank if unassigned"
                />
            </div>
        </TableRowActionMenu>
    );
}
