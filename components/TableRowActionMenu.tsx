"use client";

import { ReactNode, useState, useTransition } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { dbLoaderStates } from "@/components/ui/db-loader-states";

export default function TableRowActionMenu({
    sheetTitle,
    onEditSubmit,
    onDelete,
    children,
}: {
    sheetTitle: string;
    onEditSubmit: (formData: FormData) => Promise<unknown>;
    onDelete: () => Promise<unknown>;
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    return (
        <>
            <MultiStepLoader loadingStates={dbLoaderStates} loading={isPending} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Row actions">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() =>
                            startTransition(async () => {
                                await onDelete();
                            })
                        }
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{sheetTitle}</SheetTitle>
                    </SheetHeader>
                    <form
                        action={(formData) =>
                            startTransition(async () => {
                                await onEditSubmit(formData);
                                setOpen(false);
                            })
                        }
                        className="grid flex-1 auto-rows-min gap-4 px-4 mt-6"
                    >
                        {children}
                        <SheetFooter className="mt-4">
                            <Button type="submit" disabled={isPending}>
                                Save changes
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </>
    );
}
