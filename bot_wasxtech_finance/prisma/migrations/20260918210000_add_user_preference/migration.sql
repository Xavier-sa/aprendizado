-- CreateEnum
CREATE TYPE "ThemePalette" AS ENUM ('PAPIRO', 'ESMERALDA', 'OCEANO', 'GRAFITE', 'AMETISTA');

-- CreateTable
CREATE TABLE "UserPreference" (
    "userId" TEXT NOT NULL,
    "theme" "ThemePalette" NOT NULL DEFAULT 'PAPIRO',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
