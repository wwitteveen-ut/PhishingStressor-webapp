import { NextResponse } from 'next/server';

export async function GET({ params }: { params: { experimentId: string } }) {
    const { experimentId } = params;

    const response = await fetch(`${process.env.API_BASE_URL}/api/experiments/${experimentId}`);
    const mails = await response.json();

    return NextResponse.json({ mails });
}
