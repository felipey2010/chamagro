'use client'
import PhotoComponent from '@/components/PhotoComponent'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUserRole } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { userMenu } from './data/UserMenu'
import Logout from './Logout'

export type userProps = {
  id?: string
  name: string
  image?: string
  role: string
  email: string
}

type Props = {
  user: userProps
  role: string
}

function LoggedUserButton({ user, role }: Props) {
  const router = useRouter()
  const { name, image, email } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="h-[50px] w-[50px] flex items-center justify-center rounded-full border-2 border-primary"
        >
          <PhotoComponent name={name} src={image || ''} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 origin-top border-border">
        <DropdownMenuLabel className="font-medium">
          <div className="flex flex-col space-y-2">
            <p className="text-sm leading-none">{name}</p>
            <div className="w-full flex items-center gap-2 justify-between">
              {email && (
                <p className="text-xs leading-none text-muted-foreground line-clamp-1">
                  {email}
                </p>
              )}
              {role && (
                <p className="text-xs leading-none text-muted-foreground">
                  {getUserRole(role)}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMenu.map((menu) => (
          <DropdownMenuItem
            key={menu.title}
            onClick={() => router.push(menu.link)}
            className="w-full flex items-center gap-2 p-2 text-black/75 dark:text-gray-200 hover:bg-card-foreground/10 cursor-pointer"
          >
            {<menu.icon size={16} />}
            {menu.title}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LoggedUserButton
