
export async function GET() {
    const response = await fetch(`${process.env.API_BASE_URL}/api/mails`);
    const mails = await response.json();

    return Response.json({ mails });
}