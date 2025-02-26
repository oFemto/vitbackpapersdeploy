import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import * as fs from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const subjectCode = formData.get('subjectCode') as string;
    const examType = formData.get('examType') as string;
    const semester = formData.get('semester') as string;
    const year = parseInt(formData.get('year') as string);

    if (!file || !title || !subjectCode || !examType || !semester || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);

    // Ensure upload directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Save file
    await writeFile(filepath, buffer);

    // Save paper metadata to database
    const paper = await prisma.paper.create({
      data: {
        title,
        subjectCode,
        examType,
        semester,
        year,
        filePath: `/uploads/${filename}`,
        views: 0,
      },
    });

    return NextResponse.json(paper, { status: 201 });
  } catch (error) {
    console.error('Error uploading paper:', error);
    return NextResponse.json(
      { error: 'Error uploading paper' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const papers = await prisma.paper.findMany({
      orderBy: {
        views: 'desc'
      }
    })
    return NextResponse.json(papers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch papers' }, { status: 500 })
  }
}