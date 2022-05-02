import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isLogeado } from '../App'

const PrivateRoute = () => {
    const location = useLocation();
    return isLogeado() ? <Outlet/> :  <Navigate to="login" state={{from: location}}/>
}

export default PrivateRoute