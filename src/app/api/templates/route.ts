import { NextResponse } from 'next/server';
import { RealProjectService } from '@/services/real-project-service';

export async function GET() {
  try {
    const templates = await RealProjectService.getAvailableTemplatesInfo();
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}
