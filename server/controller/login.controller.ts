import { Request, Response } from "express";
import { betterAuth } from "better-auth";
import { auth } from "../lib/auth";

export const authHandler = (req: Request, res: Response) => {
  betterAuth({
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      emailAndPassword: {
        enabled: true,
      },
    },
  });
};
