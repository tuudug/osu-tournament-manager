import * as osu from "osu-api-v2-js";

let apiInstance: osu.API | null = null;

export async function getOsuClient() {
  if (apiInstance) return apiInstance;

  const clientId = process.env.OSU_CLIENT_ID;
  const clientSecret = process.env.OSU_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing osu! client ID or secret");
  }

  apiInstance = await osu.API.createAsync(Number(clientId), clientSecret);
  return apiInstance;
}
