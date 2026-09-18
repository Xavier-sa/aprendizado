import { z } from "zod";
import { THEME_IDS } from "@/lib/themes";
export const appearanceSchema = z.object({ theme: z.enum(THEME_IDS) }).strict();
