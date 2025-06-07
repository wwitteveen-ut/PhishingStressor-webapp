"use server";

export async function getExternalApiUrl(path: string) {
  const baseUrl = process.env.EXTERNAL_API_URL;
  if (!baseUrl) {
    throw new Error("The external API url is not set in the .env");
  }
  return `${baseUrl}${path}`;
}
