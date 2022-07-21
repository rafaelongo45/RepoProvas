/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,teacherDisciplineId]` on the table `tests` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tests_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_token_key" ON "Sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tests_name_teacherDisciplineId_key" ON "tests"("name", "teacherDisciplineId");
