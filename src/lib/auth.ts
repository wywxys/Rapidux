import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

// 环境变量验证
if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET must be set in production');
}

if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_URL) {
  throw new Error('NEXTAUTH_URL must be set in production');
}

console.log('Auth configuration:', {
  nodeEnv: process.env.NODE_ENV,
  hasSecret: !!process.env.NEXTAUTH_SECRET,
  nextAuthUrl: process.env.NEXTAUTH_URL,
  hasGoogleId: !!process.env.GOOGLE_CLIENT_ID,
  hasGithubId: !!process.env.GITHUB_ID,
});

// 简单的管理员账户配置
const adminUsers = [
  {
    id: '1',
    email: 'admin@rapidux.com',
    password: 'admin123',
    name: 'Admin User',
    image: null,
  },
  {
    id: '2', 
    email: 'test@rapidux.com',
    password: 'test123',
    name: 'Test User',
    image: null,
  }
];

export const authOptions: NextAuthOptions = {
  providers: [
    // 本地测试用的凭据登录
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('NextAuth authorize called with:', { 
          email: credentials?.email, 
          hasPassword: !!credentials?.password,
          nodeEnv: process.env.NODE_ENV 
        });

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        const user = adminUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          console.log('User found:', { id: user.id, email: user.email, name: user.name });
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }
        
        console.log('User not found for email:', credentials.email);
        return null;
      },
    }),
    // OAuth providers (可以稍后配置)
    ...(process.env.GOOGLE_CLIENT_ID ? [GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })] : []),
    ...(process.env.GITHUB_ID ? [GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })] : []),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        console.log('JWT callback - new sign in:', { userId: user.id, provider: account.provider });
        token.accessToken = account.access_token;
        token.userId = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log('Session callback:', { 
        userId: token.userId || token.sub,
        email: session.user?.email 
      });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.userId || token.sub,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
