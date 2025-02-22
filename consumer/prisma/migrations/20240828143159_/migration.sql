-- CreateTable
CREATE TABLE "LastSeqno" (
    "id" SERIAL NOT NULL,
    "seqno" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LastSeqno_pkey" PRIMARY KEY ("id")
);
