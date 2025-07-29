import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { RealProjectService } from '@/services/real-project-service';

// 使用相同的模拟数据（在实际应用中应该使用数据库）
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

// 获取单个项目详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: projectId } = await params;
    
    // 首先尝试从真实项目中查找
    let project = await RealProjectService.getProjectById(projectId);
    
    // 如果没找到，从模拟数据中查找
    if (!project) {
      project = mockProjects.find(p => p.id === projectId);
    }
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // 验证项目所有权
    const userId = session.user.email === 'admin@rapidux.com' ? '1' : '2';
    if (project.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 模拟项目统计信息
    const stats = {
      files: {
        total: 12,
        byType: {
          '.tsx': 5,
          '.ts': 3,
          '.css': 2,
          '.json': 2
        }
      },
      size: 1024 * 50, // 50KB
      lastModified: new Date(project.updatedAt)
    };
    
    return NextResponse.json({ project, stats });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 更新项目
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: projectId } = await params;
    const project = await RealProjectService.getProjectById(projectId);
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // 验证项目所有权
    const userId = session.user.email === 'admin@rapidux.com' ? '1' : '2';
    if (project.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { name, description, status } = await request.json();
    
    const updates: any = {};
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (status) updates.status = status;

    const updatedProject = RealProjectService.updateProject(projectId, updates);
    
    if (!updatedProject) {
      return NextResponse.json({ error: 'Failed to update project' }, { status: 400 });
    }

    return NextResponse.json({ 
      project: updatedProject,
      message: 'Project updated successfully'
    });

  } catch (error) {
    console.error('Error updating project:', error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 删除项目
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: projectId } = await params;
    const project = await RealProjectService.getProjectById(projectId);
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // 验证项目所有权
    const userId = session.user.email === 'admin@rapidux.com' ? '1' : '2';
    if (project.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const success = await RealProjectService.deleteProject(projectId);
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
