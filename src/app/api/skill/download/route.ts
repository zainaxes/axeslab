import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get('type') || 'merged'; // 'axeslab' | 'axeskit' | 'merged'

    let filename = 'SKILL.md';
    let subfolder = 'merged';

    if (target === 'axeslab') {
      subfolder = 'axeslab';
    } else if (target === 'axeskit') {
      subfolder = 'axeskit';
    } else {
      subfolder = 'merged';
    }

    const filePath = path.join(process.cwd(), 'public', 'skills', subfolder, 'SKILL.md');

    if (!fs.existsSync(filePath)) {
      return new NextResponse('Skill file not found', { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${subfolder}-SKILL.md"`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new NextResponse(`Error downloading skill: ${err.message}`, { status: 500 });
  }
}
