'use client'

import { Input } from "./ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function VenueInput() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("venue", term);
        } else {
            params.delete("venue");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Input
            placeholder="Filter by Venue"
            id="venue_name"
            defaultValue={searchParams.get("venue")?.toString() || ""}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
}
