/*
  Warnings:

  - Added the required column `userId` to the `Tribute` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Tribute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tribute" ("createdAt", "id", "nickname") SELECT "createdAt", "id", "nickname" FROM "Tribute";
DROP TABLE "Tribute";
ALTER TABLE "new_Tribute" RENAME TO "Tribute";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
