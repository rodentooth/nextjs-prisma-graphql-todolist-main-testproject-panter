import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import prismaClient from "../../prisma/prismaClient";
export type Context = {
  prisma: PrismaClient;
  session: Session | null;
};

export const context: ({ req }: { req: NextApiRequest }) => Promise<Context> =
  async ({ req }) => ({
    prisma: prismaClient,
    session: await getSession({ req }),
  });
