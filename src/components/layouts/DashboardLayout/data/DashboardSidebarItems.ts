import {
  Bell,
  Calendar,
  Home,
  Inbox,
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
    url: '#',
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
        url: '#',
        icon: Users2,
      },
      {
        title: 'Perfis de Acesso',
        url: '#',
        icon: UserRoundPen,
      },
    ],
  },
  {
    title: 'Chamados',
    url: '#',
    icon: Phone,
  },
  {
    title: 'Equipe',
    url: '#',
    icon: Users,
  },
  {
    title: 'Mensagens',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Posts',
    url: '#',
    icon: SquarePen,
  },
  {
    title: 'Suporte',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Notificações',
    url: '#',
    icon: Bell,
  },
  {
    title: 'Configuraçoes',
    url: '#',
    icon: Settings,
  },
]
