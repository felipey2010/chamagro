import { Bell } from 'lucide-react'
import PhotoComponent from './PhotoComponent'

function Navbar() {
  return (
    <div className="w-full h-10 flex items-center justify-end">
      <div className="flex items-center gap-4">
        <Bell />
        <PhotoComponent name="User Test" src="" />
      </div>
    </div>
  )
}

export default Navbar
