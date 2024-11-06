import { cn, getAvatarFallback } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

type Props = {
  name: string
  src: string
  className?: string
}

function PhotoComponent({ name, src, className }: Props) {
  return (
    <Avatar className={cn('h-10 w-10', className)}>
      <AvatarImage src={src} alt={name ? name : 'user avatar'} />
      <AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
    </Avatar>
  )
}

export default PhotoComponent
