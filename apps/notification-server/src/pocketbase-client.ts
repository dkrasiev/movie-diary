await import("dotenv/config.js");

import PocketBase from "pocketbase";

const envs = ["POCKETBASE_URL", "POCKETBASE_EMAIL", "POCKETBASE_PASSWORD"];
if ([envs.map((env) => process.env[env])].some(Boolean) === false) {
  throw new Error(
    "Some of environment variables are missing! Please, check the following variables => " +
      envs.join(", ")
  );
}

export const pocketbase = new PocketBase(process.env.POCKETBASE_URL);

await pocketbase.admins.authWithPassword(
  process.env.POCKETBASE_EMAIL!,
  process.env.POCKETBASE_PASSWORD!
);
