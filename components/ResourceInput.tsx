'use client';

import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ResourceInput() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("resource", term);
        } else {
            params.delete("resource");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Input
            placeholder="Filter by Resource"
            id="item_name"
            defaultValue={searchParams.get("resource")?.toString() || ""}
            onChange={(e) => handleSearch(e.target.value)}
        />
    );
}
