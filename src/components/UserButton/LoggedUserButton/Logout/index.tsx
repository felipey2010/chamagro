import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import { MdOutlineLogout } from 'react-icons/md'

function Logout() {
  return (
    <DropdownMenuItem
      onClick={() => signOut()}
      aria-label="Sair"
      className="w-full flex items-center gap-2 p-2 text-black/75 dark:text-gray-200 hover:bg-card-foreground/10"
    >
      <MdOutlineLogout size={16} />
      <p className="text-base">Sair</p>
    </DropdownMenuItem>
  )
}

export default Logout
