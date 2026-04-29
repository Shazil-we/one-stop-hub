"use client";

import { useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { approveResourceAllocationAction } from "@/app/actions/resourceAllocationManageAction";

export default function ApproveResourceAllocationCheckbox({
    allocationId,
    approved,
}: {
    allocationId: string;
    approved: boolean;
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <Checkbox
            checked={approved}
            disabled={approved || isPending}
            onCheckedChange={(checked) => {
                if (!checked || approved) return;
                startTransition(async () => {
                    await approveResourceAllocationAction(allocationId);
                });
            }}
            aria-label="Approve allocation"
        />
    );
}
