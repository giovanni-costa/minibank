-- CreateTable
CREATE TABLE "miniBanco" (
    "id" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "password" VARCHAR(6) NOT NULL,
    "name" TEXT NOT NULL,
    "amount" MONEY NOT NULL DEFAULT 0,

    CONSTRAINT "miniBanco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "miniBanco_cpf_key" ON "miniBanco"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "miniBanco_password_key" ON "miniBanco"("password");
