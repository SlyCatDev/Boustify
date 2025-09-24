import { Outlet, useLocation } from 'react-router'

export function AuthLayout() {
    const location = useLocation()
    const isLoginPage = location.pathname === '/login'

    return (
        <div>
            <h1>{isLoginPage ? 'Login Page' : 'Register Page'}</h1>
            <Outlet />
        </div>
    )
}
