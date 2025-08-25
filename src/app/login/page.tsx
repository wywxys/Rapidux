'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sparkles, Github, Mail, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setLoadingProvider('credentials');

    try {
      console.log('Attempting sign in with:', { email: formData.email });
      
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      console.log('Sign in result:', { ok: result?.ok, error: result?.error, status: result?.status });

      if (result?.ok) {
        const session = await getSession();
        console.log('Session after sign in:', { hasSession: !!session, userEmail: session?.user?.email });
        if (session) {
          router.push('/dashboard');
        } else {
          setError('会话创建失败，请重试');
        }
      } else {
        setError(`登录失败: ${result?.error || '邮箱或密码错误'}`);
      }
    } catch (error) {
      console.error('Credentials sign in failed:', error);
      setError('登录失败，请重试');
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      setLoadingProvider(provider);
      
      const result = await signIn(provider, {
        callbackUrl: '/dashboard',
        redirect: false,
      });
      
      if (result?.ok) {
        const session = await getSession();
        if (session) {
          router.push('/dashboard');
        }
      } else if (result?.error) {
        setError(`${provider} 登录失败`);
        console.error('OAuth sign in error:', result.error);
      }
    } catch (error) {
      setError('登录失败，请重试');
      console.error('OAuth sign in failed:', error);
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold">
              Rapidux
            </h1>
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button asChild variant="ghost">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <main className="max-w-md mx-auto px-6 py-20">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue building amazing components
            </p>
          </div>

          {/* Login Card */}
          <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm space-y-4">
            {/* 测试账户信息 */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">测试账户：</p>
              <div className="text-xs text-blue-700 dark:text-blue-200 space-y-1">
                <div>📧 admin@rapidux.com / admin123</div>
                <div>📧 test@rapidux.com / test123</div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleCredentialsSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="输入邮箱地址"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="输入密码"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {loadingProvider === 'credentials' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                登录
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  或使用第三方登录
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
                className="w-full"
                variant="outline"
                size="lg"
              >
                {loadingProvider === 'github' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                Continue with GitHub
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
                className="w-full"
                variant="outline"
                size="lg"
              >
                {loadingProvider === 'google' ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                Continue with Google
              </Button>
            </div>
          </div>

          {/* Terms */}
          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-12 space-y-4">
          <h3 className="text-center text-sm font-medium text-muted-foreground">
            What you'll get access to:
          </h3>
          <div className="grid gap-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <span>AI-powered component generation</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <span>Project management and templates</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary" />
              </div>
              <span>Real-time preview and editing</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
