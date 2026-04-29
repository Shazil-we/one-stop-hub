"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TableRowActionMenu from "./TableRowActionMenu";
import { deleteUserRowAction, updateUserRowAction } from "@/app/actions/tableManageActions";

export default function UserRowActions({
    user,
}: {
    user: {
        user_id: string;
        full_name: string;
        email: string;
        role: "Student" | "SocietyHead" | "Administrator";
    };
}) {
    return (
        <TableRowActionMenu
            sheetTitle="Edit User"
            onEditSubmit={updateUserRowAction}
            onDelete={async () => deleteUserRowAction(user.user_id)}
        >
            <input type="hidden" name="userId" value={user.user_id} />
            <div className="grid gap-2">
                <Label htmlFor={`fullName-${user.user_id}`}>Full Name</Label>
                <Input id={`fullName-${user.user_id}`} name="fullName" defaultValue={user.full_name} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`email-${user.user_id}`}>Email</Label>
                <Input id={`email-${user.user_id}`} name="email" type="email" defaultValue={user.email} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor={`role-${user.user_id}`}>Role</Label>
                <Input id={`role-${user.user_id}`} name="role" defaultValue={user.role} required />
            </div>
        </TableRowActionMenu>
    );
}
