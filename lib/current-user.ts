import { cache } from "react";
import { extractUserFullInfo } from "@/Queries/Users";

export const getCurrentUser = cache(async () => extractUserFullInfo());
