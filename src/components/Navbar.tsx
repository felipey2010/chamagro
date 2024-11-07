import Image from 'next/image'
import Link from 'next/link'
import UserButton from './UserButton'

function Navbar() {
  return (
    <header className="w-full bg-green-500 mb-28">
      <div className="px-12 m-auto h-20 flex justify-between items-center max-w-full ">
        <Link href="/">
          <Image src="/assets/iconLogo.svg" alt="home" width={97} height={49} />
        </Link>
        <nav>
          <UserButton />
        </nav>
      </div>
    </header>
  )
}

export default Navbar
