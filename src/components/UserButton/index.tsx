'use client'
import { useSession } from 'next-auth/react'
import LoadingState from './LoadingState'
import LoggedUserButton from './LoggedUserButton'
import LoginButton from './LoginButton'

function UserButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LoadingState />
  }

  return (
    <>
      {status === 'authenticated' ? (
        <LoggedUserButton user={session.user} role={session.user?.role} />
      ) : (
        <LoginButton />
      )}
    </>
  )
}

export default UserButton
