"use client";

import { useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { approveRequestAction } from "@/app/actions/requestManageAction";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { dbLoaderStates } from "@/components/ui/db-loader-states";

export default function ApproveRequestCheckbox({
    requestId,
    approved,
}: {
    requestId: string;
    approved: boolean;
}) {
    const [isPending, startTransition] = useTransition();

    return (
        <>
            <MultiStepLoader loadingStates={dbLoaderStates} loading={isPending} />
            <Checkbox
                checked={approved}
                disabled={approved || isPending}
                onCheckedChange={(checked) => {
                    if (!checked || approved) return;
                    startTransition(async () => {
                        await approveRequestAction(requestId);
                    });
                }}
                aria-label="Approve request"
            />
        </>
    );
}
