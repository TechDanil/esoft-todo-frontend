import { Button } from '@material-tailwind/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { REGISTER_SCREEN, TASKS_SCREEN } from '../../../configs/screens.config'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { ILoginRequest } from '../../../shared/interfaces/auth.interface'

const LoginForm = () => {
	const { login } = useActions()

	const [formData, setFormData] = useState<ILoginRequest>({
		login: '',
		password: '',
	})

	const { isError, isAuth } = useTypedSelector(state => state.auth)

	const navigate = useNavigate()

	useEffect(() => {
		if (!isError && isAuth) {
			navigate(TASKS_SCREEN)
		}
	}, [isError, isAuth, navigate])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await login(formData)
			console.log('formData', formData)
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<form className='flex flex-col justify-center items-center space-y-4 py-6 px-8 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-semibold'>Login form</h2>
			<div className='w-full max-w-xs'>
				<div className='mb-4'>
					<label
						htmlFor='login'
						className='block text-sm font-medium text-gray-700'
					>
						Login
					</label>
					<input
						type='text'
						name='login'
						id='login'
						value={formData.login}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
						placeholder='Enter your login'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						Password
					</label>
					<input
						type='password'
						name='password'
						id='password'
						value={formData.password}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
						placeholder='Enter your password'
					/>
				</div>
				<Button
					onClick={handleSubmit}
					color='blue'
					ripple={true}
					className='w-full md:w-auto'
				>
					Login
				</Button>

				<Link
					to={REGISTER_SCREEN}
					className='block mt-2 text-blue-500 hover:text-blue-700'
				>
					Don't you have an account yet? Sign up
				</Link>
			</div>
		</form>
	)
}

export default LoginForm
