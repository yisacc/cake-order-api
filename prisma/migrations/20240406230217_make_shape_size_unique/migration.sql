/*
  Warnings:

  - A unique constraint covering the columns `[shape]` on the table `CakeShape` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[size]` on the table `CakeSize` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CakeShape_shape_key" ON "CakeShape"("shape");

-- CreateIndex
CREATE UNIQUE INDEX "CakeSize_size_key" ON "CakeSize"("size");
