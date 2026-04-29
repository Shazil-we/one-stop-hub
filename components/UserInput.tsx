'use client'

import { Input } from "./ui/input";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function UserInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("user", term);
    } else {
      params.delete("user");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      placeholder="Filter by User Name"
      id="user_name"
      defaultValue={searchParams.get("user")?.toString() || ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
