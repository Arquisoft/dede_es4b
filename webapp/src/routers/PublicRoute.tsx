import { Navigate, Outlet } from 'react-router-dom'
import { isLogeado } from '../App'

const PublicRoute = () => {
    return !isLogeado() ? <Outlet/> :  <Navigate to="productos"/>
}

export default PublicRoute