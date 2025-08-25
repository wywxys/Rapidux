import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Only allow in development or with specific debug token
  const isDebugAllowed = process.env.NODE_ENV === 'development' || 
                        request.nextUrl.searchParams.get('token') === process.env.DEBUG_TOKEN;
  
  if (!isDebugAllowed) {
    return NextResponse.json({ error: 'Debug endpoint not available' }, { status: 403 });
  }

  const debugInfo = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    secretLength: process.env.NEXTAUTH_SECRET?.length || 0,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGithubId: !!process.env.GITHUB_ID,
    headers: {
      host: request.headers.get('host'),
      'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
      'x-forwarded-host': request.headers.get('x-forwarded-host'),
    },
    url: request.url,
  };

  return NextResponse.json(debugInfo);
}
