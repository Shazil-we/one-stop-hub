"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea"
import { DatePickerInput } from "./Datepicker"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { createSocietyAction } from "@/app/actions/societyAction"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import { dbLoaderStates } from "@/components/ui/db-loader-states"
export function AddSocietyField() {
    const [societyDate, setsocietyDate] = useState<Date | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        if (societyDate) {
            formData.append("societyDate", societyDate.toISOString());
        }

        try {
            const result = await createSocietyAction(formData);

            if (result.success) {
                setIsOpen(false);
            } else {
                console.error("Failed to create event:", result.error);
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
                    <Button variant="outline" className="ml-4">Add Society</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add Society</SheetTitle>
                    </SheetHeader>

                    <form action={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
                    <div className="grid gap-3">
                        <Label htmlFor="societyName">Society Name</Label>
                        <Input id="societyName" name="societyName" placeholder="enter society name" required />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="societyDescription">Society Description</Label>
                        <Textarea id="societyDescription" name="societyDescription" placeholder="enter society details" required />
                    </div>

                    <div className="grid gap-3">
                        <DatePickerInput
                            selectedDate={societyDate}
                            onDateChange={setsocietyDate}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="HeadEmail">Head Email</Label>
                        <Input id="HeadEmail" name="HeadEmail" placeholder="enter Head Email" required />
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
    )
}