import { auth } from '@/auth'
import HomePageView from '@/views/HomeView'

export default async function Home() {
  const session = await auth()
  if (session) return <div>Dashboard</div>

  return <HomePageView />
}
