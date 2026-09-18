import { prisma } from "@/lib/prisma";
import { DEFAULT_THEME, type Theme } from "@/lib/themes";

export const preferenceRepository = {
  async get(userId: string): Promise<Theme> {
    const preference = await prisma.userPreference.findUnique({
      where: { userId }, select: { theme: true },
    });
    return preference?.theme ?? DEFAULT_THEME;
  },
  async set(userId: string, theme: Theme): Promise<Theme> {
    const preference = await prisma.userPreference.upsert({
      where: { userId }, create: { userId, theme }, update: { theme }, select: { theme: true },
    });
    return preference.theme;
  },
};
