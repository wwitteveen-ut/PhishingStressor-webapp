export function getApiUrl(path: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  console.log(baseUrl);
  return `${baseUrl}${path}`;
}
