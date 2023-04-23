import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.$connect().then(() =>
  prisma.role.create({
    data: {
      id: "0",
      name: "default",
      rights: { create: { id: "0", name: "default" } },
    },
  })
);
