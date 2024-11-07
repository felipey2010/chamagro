import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAvatarFallback = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((item) => item[0])
    .join('')
    .toUpperCase()

export const getUserRole = (role: string) => {
  const roleMap: Record<string, string> = {
    FARMER: 'Produtor',
    TECHNICIAN: 'Técnico',
    MERCHANT: 'Comerciante',
    NORMAL: 'Normal',
  }

  return roleMap[role] || 'Função desconhecida'
}
