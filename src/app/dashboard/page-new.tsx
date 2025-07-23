'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sparkles, Plus, FolderOpen, Calendar, Code2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingButton } from '@/components/composite';
import { UserMenu } from '@/components/dashboard/user-menu';
import { CreateProjectDialog } from '@/components/dashboard/create-project-dialog';
import { Project } from '@/types/real-project';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/login');
    
    // 获取用户项目
    if (session?.user?.email) {
      fetchProjects();
    }
  }, [session, status, router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold">
              Rapidux
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <CreateProjectDialog onProjectCreated={fetchProjects} />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4 py-12">
            <h1 className="text-3xl font-bold">Welcome to your dashboard</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create and manage your Next.js projects with AI assistance. 
              Each project is a complete, runnable application.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors group cursor-pointer"
                 onClick={() => (document.querySelector('[data-dialog-trigger]') as HTMLElement)?.click()}>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Create New Project</h3>
                  <p className="text-sm text-muted-foreground">
                    Start building a new project with our Next.js template
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border bg-card opacity-50">
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg w-fit">
                  <FolderOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground">Browse Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore pre-built templates (Coming Soon)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Projects</h2>
              <CreateProjectDialog onProjectCreated={fetchProjects} />
            </div>
            
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      {/* Project Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'active' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {project.status}
                        </div>
                      </div>

                      {/* Project Stats */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Code2 className="h-4 w-4" />
                          <span className="capitalize">{project.framework}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Project Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          asChild 
                          size="sm"
                        >
                          <Link href={`/generator?project=${project.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Open
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <FolderOpen className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No projects yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first project to get started
                </p>
                <CreateProjectDialog onProjectCreated={fetchProjects} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
