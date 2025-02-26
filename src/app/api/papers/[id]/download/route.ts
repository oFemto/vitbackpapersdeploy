import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const paper = await prisma.paper.update({
      where: { id: resolvedParams.id },
      data: {
        downloads: { increment: 1 },
      },
    });

    return NextResponse.json(paper);
  } catch (error) {
    console.error('Error updating download count:', error);
    return NextResponse.json(
      { error: 'Error updating download count' },
      { status: 500 }
    );
  }
}