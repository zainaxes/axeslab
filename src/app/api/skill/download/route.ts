import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'skills', 'axeslab', 'SKILL.md');
    
    if (!fs.existsSync(filePath)) {
      return new NextResponse('Skill file not found', { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': 'attachment; filename="SKILL.md"',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new NextResponse(`Error downloading skill: ${err.message}`, { status: 500 });
  }
}
