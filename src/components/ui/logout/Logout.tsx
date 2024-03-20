import { useNavigate } from 'react-router-dom'
import { LOGIN_SCREEN } from '../../../configs/screens.config'
import { useActions } from '../../../hooks/useActions'

const Logout = () => {
	const { logout } = useActions()
	const navigate = useNavigate()

	const handleLogout = async () => {
		await logout()
		// localStorage.removeItem('user')
		navigate(LOGIN_SCREEN)
	}

	return (
		<button
			onClick={handleLogout}
			className='inline-flex items-center ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
		>
			Log out
		</button>
	)
}

export default Logout
