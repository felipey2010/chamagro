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
