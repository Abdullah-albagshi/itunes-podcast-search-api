-- CreateTable
CREATE TABLE "podcasts" (
    "id" TEXT NOT NULL,
    "trackId" INTEGER NOT NULL,
    "trackName" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "collectionName" TEXT,
    "feedUrl" TEXT,
    "artworkUrl30" TEXT,
    "artworkUrl60" TEXT,
    "artworkUrl100" TEXT,
    "releaseDate" TIMESTAMP(3),
    "country" TEXT,
    "primaryGenreName" TEXT,
    "trackViewUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "podcasts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "podcasts_trackId_key" ON "podcasts"("trackId");
