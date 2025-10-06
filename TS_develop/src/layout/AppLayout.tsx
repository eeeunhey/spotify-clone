
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        Sidebar
        
        <Outlet/>
    </div>
  )
}

export default AppLayout