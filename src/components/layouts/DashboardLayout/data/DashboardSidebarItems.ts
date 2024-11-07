import {
  Bell,
  Calendar,
  Home,
  Inbox,
  Newspaper,
  Phone,
  Settings,
  Shield,
  SquarePen,
  UserRoundPen,
  Users,
  Users2,
} from 'lucide-react'

export const dashboardSidebarItems = [
  {
    title: 'Inicial',
    url: '/',
    icon: Home,
  },
  {
    title: 'Administração',
    url: '#',
    icon: Shield,
    isActive: false,
    items: [
      {
        title: 'Usuários',
        url: '/admin/usuarios',
        icon: Users2,
      },
      {
        title: 'Perfis de Acesso',
        url: '/admin/perfis',
        icon: UserRoundPen,
      },
    ],
  },
  {
    title: 'Chamados',
    url: '/chamados',
    icon: Phone,
  },
  {
    title: 'Equipe',
    url: '/equipe',
    icon: Users,
  },
  {
    title: 'Mensagens',
    url: '/mensagens',
    icon: Inbox,
  },
  {
    title: 'Posts',
    url: '/posts',
    icon: SquarePen,
  },
  {
    title: 'Informes',
    url: '/informes',
    icon: Newspaper,
  },
  {
    title: 'Suporte',
    url: '/suporte',
    icon: Calendar,
  },
  {
    title: 'Notificações',
    url: '/notificacoes',
    icon: Bell,
  },
  {
    title: 'Configuraçoes',
    url: '/configuracoes',
    icon: Settings,
  },
]
