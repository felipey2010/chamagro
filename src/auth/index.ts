import { loginUser } from '@/lib/queries/auth.action'
import { getUserByEmail } from '@/lib/queries/users.actions'
import { signInSchema } from '@/schemas/auth.schema'
import NextAuth, { NextAuthConfig } from 'next-auth'
import 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

interface userType {
  id: string
  name: string
  image?: string
  email: string
  provider: string
  role: string
  needsSetup: boolean
}

declare module 'next-auth' {
  interface Session {
    user: userType
  }
  interface User {
    id?: string
    name?: string | null
    image?: string | null
    email?: string | null
    role: string
    needsSetup: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider: string
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
    needsSetup: boolean
  }
}

const config = {
  // theme: { logo: logo_svg },
  providers: [
    GithubProvider,
    GoogleProvider,
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'seu-email@exemplo.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = signInSchema.safeParse({
            email: credentials?.email,
            password: credentials?.password,
          })

          if (!parsedCredentials.success) {
            throw new Error('Credenciais inválidas')
          }

          const { success, data } = await loginUser(parsedCredentials.data)
          if (success && data) {
            const { name, username, email, image, id, role } = data
            return {
              id,
              name,
              username,
              email,
              image,
              role,
              needsSetup: false,
            }
          } else {
            return null
          }
        } catch (error: unknown) {
          throw new Error(
            error instanceof Error
              ? error.message
              : 'Erro interno na autenticação'
          )
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          const email = user.email || profile?.email || ''
          const response = await getUserByEmail(email)

          const { data } = response

          if (data) {
            user.id = data.id
            user.role = data.role
            user.needsSetup = false
            return true
          } else {
            user.needsSetup = true
            user.role = 'DEFAULT'
            return true
          }
        } catch (error: unknown) {
          throw new Error(
            error instanceof Error ? error.message : 'Error de autenticação'
          )
        }
      }
      return true
    },
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === 'update') {
        token.name = session.user.name
        token.needsSetup = session.user.needsSetup
      }

      if (account) {
        token.provider = account.provider
      }

      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any

      if (user) {
        session.user.email = user.email
        session.user.provider = token.provider
        session.user.id = token.id || ''
        session.user.name = token.name || ''
        session.user.email = token.email || ''
        session.user.image = token.image || ''
        session.user.role = token.role || 'MENTEE'
        session.user.needsSetup = token.needsSetup || true
      }

      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
