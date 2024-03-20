import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface IProtectedRouteProps {
	redirectPath: string
	token: string
	children: ReactNode
}

function ProtectedRoute({
	redirectPath,
	token,
	children,
}: IProtectedRouteProps) {
	console.log('token', token)
	if (!token) {
		return <Navigate to={redirectPath} replace />
	}

	return children ? children : <Outlet />
}

export default ProtectedRoute
