import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
    
    // 过滤用户的项目
    const userProjects = mockProjects.filter(p => p.userId === userId);
    
    return NextResponse.json({ projects: userProjects });
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

    const { name, description, framework = 'nextjs' } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    // 根据email确定userId
    const userId = session.user.email === 'admin@rapidux.com' ? '1' : '2';
    
    // 检查项目名称是否已存在
    const existingProject = mockProjects.find(p => 
      p.userId === userId && p.name.toLowerCase() === name.toLowerCase()
    );
    
    if (existingProject) {
      return NextResponse.json({ 
        error: `Project name "${name}" already exists` 
      }, { status: 409 });
    }

    // 创建新项目
    const newProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: description || `A new ${framework} project created with Rapidux`,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      path: `/user-projects/${userId}/${name.toLowerCase().replace(/\s+/g, '-')}`,
      status: 'active',
      framework
    };

    mockProjects.push(newProject);

    return NextResponse.json({ 
      project: newProject,
      message: 'Project created successfully'
    });

  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
