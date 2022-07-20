/*
  Warnings:

  - You are about to drop the `discipline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "discipline" DROP CONSTRAINT "discipline_termId_fkey";

-- DropForeignKey
ALTER TABLE "teacherDisciplines" DROP CONSTRAINT "teacherDisciplines_disciplineId_fkey";

-- DropTable
DROP TABLE "discipline";

-- CreateTable
CREATE TABLE "disciplines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "termId" INTEGER NOT NULL,

    CONSTRAINT "disciplines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "disciplines_name_key" ON "disciplines"("name");

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_termId_fkey" FOREIGN KEY ("termId") REFERENCES "terms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacherDisciplines" ADD CONSTRAINT "teacherDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
