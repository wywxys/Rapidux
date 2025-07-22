'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sparkles, Plus, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/composite';
import { UserMenu } from '@/components/dashboard/user-menu';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) router.push('/login');
  }, [session, status, router]);

  if (status === 'loading') {
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
            <Button asChild className="h-9">
              <Link href="/generator">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
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
              Start creating amazing React components with AI assistance. 
              Your projects will appear here once you create them.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/generator"
              className="p-6 rounded-lg border bg-card hover:bg-accent transition-colors group"
            >
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Create New Project</h3>
                  <p className="text-sm text-muted-foreground">
                    Start building a new component with AI assistance
                  </p>
                </div>
              </div>
            </Link>

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
              <Button asChild variant="outline">
                <Link href="/generator">Create Project</Link>
              </Button>
            </div>
            
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">No projects yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first project to get started
              </p>
              <Button asChild>
                <Link href="/generator">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
