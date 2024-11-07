import { USER_MENU_LINKS } from '@/data/AppRoutes'
import { IconType } from 'react-icons/lib'
import {
  MdOutlineSettings,
  MdOutlineSupportAgent,
  MdRssFeed,
} from 'react-icons/md'

export type UserMenuType = {
  title: string
  link: string
  icon: IconType
}

export const userMenu: UserMenuType[] = [
  {
    title: 'Feed',
    link: USER_MENU_LINKS.FEED,
    icon: MdRssFeed,
  },
  {
    title: 'Configuração',
    link: USER_MENU_LINKS.CONFIGURATION,
    icon: MdOutlineSettings,
  },
  {
    title: 'Suporte',
    link: USER_MENU_LINKS.SUPPORT,
    icon: MdOutlineSupportAgent,
  },
]
