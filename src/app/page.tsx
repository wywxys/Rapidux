import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Sparkles, Code2, Zap, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  // 如果已登录，重定向到仪表板
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
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
            <ThemeToggle />
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Build React Components
              <span className="text-primary block">with AI Assistance</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate modern React components using Next.js, TypeScript, Tailwind CSS, and shadcn/ui. 
              Turn your ideas into production-ready code in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/login">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="https://github.com/wywxys/rapidux" target="_blank">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center space-y-4 p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Modern Tech Stack</h3>
            <p className="text-muted-foreground">
              Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components for the best developer experience.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Generate production-ready components in seconds with intelligent AI assistance and real-time preview.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">AI Powered</h3>
            <p className="text-muted-foreground">
              Advanced AI understands your requirements and generates clean, maintainable code following best practices.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 p-8 rounded-lg border bg-card/50 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4">Ready to accelerate your development?</h2>
          <p className="text-muted-foreground mb-6">
            Join developers who are building faster with AI assistance.
          </p>
          <Button asChild size="lg">
            <Link href="/login">
              Get Started for Free
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2025 Rapidux. Built with ❤️ for developers.</p>
        </div>
      </footer>
    </div>
  );
}
