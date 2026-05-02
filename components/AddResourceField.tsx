"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { createResourceAction } from "@/app/actions/resourceAction";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { dbLoaderStates } from "@/components/ui/db-loader-states";

export function AddResourceField() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const result = await createResourceAction(formData);

            if (result.success) {
                setIsOpen(false);
            } else {
                console.error("Failed to create resource:", result.error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <MultiStepLoader loadingStates={dbLoaderStates} loading={isLoading} />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="ml-4">Add Resource</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add Resource</SheetTitle>
                    </SheetHeader>

                    <form action={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
                    <div className="grid gap-3">
                        <Label htmlFor="itemName">Resource Name</Label>
                        <Input id="itemName" name="itemName" placeholder="enter resource name" required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="totalInventory">Total Inventory</Label>
                        <Input
                            id="totalInventory"
                            name="totalInventory"
                            type="number"
                            min={0}
                            placeholder="enter total inventory"
                            required
                        />
                    </div>

                        <SheetFooter className="mt-6">
                            <Button type="submit">Save changes</Button>
                            <SheetClose asChild>
                                <Button variant="outline" type="button">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </>
    );
}
