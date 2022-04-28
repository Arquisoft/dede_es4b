import { Navigate, Outlet } from 'react-router-dom'
import { isLogeado } from '../App'

const PrivateRoute = () => {

    return isLogeado() ? <Outlet/> :  <Navigate to="login"/>
}

export default PrivateRoute