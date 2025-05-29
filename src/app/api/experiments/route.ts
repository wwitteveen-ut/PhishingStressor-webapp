import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch(`${process.env.API_BASE_URL}/api/experiments`);
    const experiments = await response.json();

    return NextResponse.json({ experiments });
}
