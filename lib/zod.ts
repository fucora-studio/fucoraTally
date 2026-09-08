// lib/schemas/user.ts
import { z } from "zod";

export const getData = z.object({
    courseCode: z
        .string()
        .regex(/^[A-Z]{4}[0-9]{4}$/, "Invalid course code (e.g COMP1511)."),
    location: z
        .string()
        .regex(/^(Paddington|Kensington)$/, "Invalid location name (e,g 'Padington', 'Kensington')"),
    term: z
        .string()
        .min(1)
        .max(3, "Invalid term."),
});
export type GetData = z.infer<typeof getData>;