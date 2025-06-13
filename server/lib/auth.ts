import { configDotenv } from "dotenv";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
configDotenv();

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:5173"],
  database: new Pool({
    connectionString:
      "postgres://postgres:habtesh01@localhost:5432/Collaborative",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: "http://localhost:5173/editor",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI: "http://localhost:5173/joinroom",
    },
  },
});
