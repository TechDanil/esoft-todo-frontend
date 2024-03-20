import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'

import Error404 from '../components/screens/error404/Error404'
import Login from '../components/screens/login/Login'
import Register from '../components/screens/register/Register'
import Tasks from '../components/screens/tasks/Tasks'
import {
	LOGIN_SCREEN,
	MAIN_SCREEN,
	REGISTER_SCREEN,
	TASKS_SCREEN,
} from '../configs/screens.config'
import ProtectedRoute from './helpers/Protected.route'

const token: string = localStorage.getItem('token') as string

const AppRouter = () => {
	console.log('token', token)

	return (
		<Router>
			<Routes>
				<Route path={MAIN_SCREEN} element={<Navigate to={LOGIN_SCREEN} />} />
				<Route path={LOGIN_SCREEN} element={<Login />} />
				<Route path={REGISTER_SCREEN} element={<Register />} />
				<Route
					path={TASKS_SCREEN}
					element={
						<ProtectedRoute redirectPath={LOGIN_SCREEN} token={token}>
							<Tasks />
						</ProtectedRoute>
					}
				/>
				<Route path='*' element={<Error404 />} />
			</Routes>
		</Router>
	)
}

export default AppRouter
