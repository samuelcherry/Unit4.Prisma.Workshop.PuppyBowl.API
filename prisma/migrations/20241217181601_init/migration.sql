-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BENCH', 'FIELD');

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
