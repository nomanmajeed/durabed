-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productDetails" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "tickSupplier" TEXT NOT NULL,
    "tickQuality" TEXT NOT NULL,
    "tickNumberRef" TEXT NOT NULL,
    "tickColourRef" TEXT NOT NULL,
    "composition" TEXT NOT NULL,
    "issuedTo" TEXT NOT NULL,
    "dateRequired" TIMESTAMP(3) NOT NULL,
    "comments" TEXT NOT NULL,
    "labelType" TEXT[],
    "springType" TEXT[],
    "quiltType" TEXT[],
    "accessories" TEXT[],
    "patternNumber" TEXT[],
    "borderType" TEXT[],
    "borderDepth" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopPanelFilling" (
    "id" SERIAL NOT NULL,
    "layer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "sizeWidth" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "TopPanelFilling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BottomPanelFilling" (
    "id" SERIAL NOT NULL,
    "layer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "sizeWidth" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "BottomPanelFilling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorderPanelFilling" (
    "id" SERIAL NOT NULL,
    "layer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "sizeWidth" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "BorderPanelFilling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TopPanelFilling" ADD CONSTRAINT "TopPanelFilling_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BottomPanelFilling" ADD CONSTRAINT "BottomPanelFilling_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorderPanelFilling" ADD CONSTRAINT "BorderPanelFilling_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
