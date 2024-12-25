import * as osu from "osu-api-v2-js";

let apiInstance: osu.API | null = null;

interface ClientProps {
  token?: string;
}

export async function getOsuClient({ token }: ClientProps) {
  console.log("Getting osu! client");
  console.log(token);

  if (apiInstance) return apiInstance;

  const clientId = process.env.OSU_CLIENT_ID;
  const clientSecret = process.env.OSU_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing osu! client ID or secret");
  }

  apiInstance = await osu.API.createAsync(Number(clientId), clientSecret);

  if (token) {
    apiInstance.access_token = token;
    apiInstance.scopes = ["identify", "public"];
  }

  return apiInstance;
}
