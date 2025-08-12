CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password"  TEXT,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    
);




CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
