'use client'

import { Input } from "./ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function EventInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set("society", term);
    } else {
      params.delete("society");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input 
      placeholder="Filter by Society" 
      id="society_name"
      defaultValue={searchParams.get("society")?.toString() || ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}