-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "celular" VARCHAR(13) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contacts_nome_key" ON "contacts"("nome");
