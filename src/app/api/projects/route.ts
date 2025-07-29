import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { RealProjectService } from '@/services/real-project-service';

// 临时内存存储（生产环境应该使用数据库）
let mockProjects: any[] = [
  {
    id: 'sample_1',
    name: 'Sample Dashboard',
    description: 'A sample dashboard project with AI-generated components',
    userId: '1',
    createdAt: new Date('2025-01-20T10:00:00Z'),
    updatedAt: new Date('2025-01-22T15:30:00Z'),
    path: '/user-projects/1/sample-dashboard',
    status: 'active',
    framework: 'nextjs'
  },
  {
    id: 'sample_2',
    name: 'Landing Page',
    description: 'A beautiful landing page template',
    userId: '1',
    createdAt: new Date('2025-01-18T14:20:00Z'),
    updatedAt: new Date('2025-01-21T09:15:00Z'),
    path: '/user-projects/1/landing-page',
    status: 'active',
    framework: 'nextjs'
  }
];

// 获取用户项目列表
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 根据email确定userId
    const userId = session.user.email === 'admin@rapidux.com' ? '1' : '2';
    
    // 获取真实项目
    let realProjects: any[] = [];
    try {
      realProjects = await RealProjectService.getUserProjects(userId);
    } catch (error) {
      console.log('No real projects found, using mock data');
    }
    
    // 如果有真实项目，优先显示真实项目；否则显示模拟项目
    let allProjects: any[] = [];
    if (realProjects.length > 0) {
      // 有真实项目时，只显示真实项目
      allProjects = realProjects;
    } else {
      // 没有真实项目时，显示模拟项目作为示例
      const userMockProjects = mockProjects.filter(p => p.userId === userId);
      allProjects = userMockProjects;
    }
    
    return NextResponse.json({ projects: allProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 创建新项目
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, framework = 'nextjs', template } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    // 根据email确定userId
    const userId = session.user.email === 'admin@rapidux.com' ? '1' : '2';
    
    try {
      // 使用RealProjectService创建真实项目
      const newProject = await RealProjectService.createProject(
        userId,
        name,
        description || `A new ${framework} project created with Rapidux`,
        framework as 'nextjs' | 'react' | 'vue',
        template // 传递模板ID
      );

      return NextResponse.json({ 
        project: newProject,
        message: 'Project created successfully'
      });
    } catch (createError) {
      console.error('Error creating real project:', createError);
      return NextResponse.json({ 
        error: createError instanceof Error ? createError.message : 'Failed to create project'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
