
export async function GET() {
    const response = await fetch('http://localhost/api/users');
    const users = await response.json();

    return Response.json({ users });
}