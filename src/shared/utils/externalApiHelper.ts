"use server";

export async function getExternalApiUrl(path: string) {
  const baseUrl = process.env.EXTERNAL_API_URL;
  if (!baseUrl) {
    throw new Error("The EXTERNAL_API_URL is not set in the .env file");
  }
  return `${baseUrl}${path}`;
}
