import { Button } from '@material-tailwind/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_SCREEN, TASKS_SCREEN } from '../../../configs/screens.config'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IRegisterRequest } from '../../../shared/interfaces/auth.interface'
import { userSelector } from '../../../store/auth/auth.selectors'
import { supervisorsSelector } from '../../../store/user/user.selectors'
import SupervisorSelector from '../supervisorSelector/SupervisorSelector'

const RegisterForm = () => {
	const { register, getResponsibleUsers } = useActions()
	const user = useTypedSelector(userSelector)
	const supervisors = useTypedSelector(supervisorsSelector)
	const { isAuth, isError } = useTypedSelector(state => state.auth)
	const navigate = useNavigate()
	console.log('supervisors', supervisors)
	console.log('isError', isError)
	console.log('user', user)
	console.log('isAuth', isAuth)

	const [formData, setFormData] = useState<IRegisterRequest>({
		name: '',
		last_name: '',
		surname: '',
		login: '',
		password: '',
		supervisor_id: 0,
	})

	useEffect(() => {
		if (!isError && isAuth) {
			setFormData({
				name: '',
				last_name: '',
				surname: '',
				login: '',
				password: '',
				supervisor_id: 0,
			})

			navigate(TASKS_SCREEN)
		}
	}, [isError, isAuth, navigate])

	useEffect(() => {
		getResponsibleUsers()
	}, [])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSupervisorChange = (supervisorId: number) => {
		setFormData({
			...formData,
			supervisor_id: supervisorId,
		})
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await register(formData)
			console.log('formzData', formData)
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<form className='flex flex-col justify-center items-center space-y-4 py-6 px-8 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-semibold'>Registration form</h2>
			<div className='w-full max-w-xs'>
				<div className='mb-4'>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700'
					>
						Name
					</label>
					<input
						type='text'
						name='name'
						id='name'
						value={formData.name}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
						placeholder='Enter your name'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='last_name'
						className='block text-sm font-medium text-gray-700'
					>
						Last name
					</label>
					<input
						type='text'
						name='last_name'
						id='last_name'
						value={formData.last_name}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
						placeholder='Enter your last name'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='surname'
						className='block text-sm font-medium text-gray-700'
					>
						Surname
					</label>
					<input
						type='text'
						name='surname'
						id='surname'
						value={formData.surname}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
						placeholder='Enter your surname'
					/>
				</div>
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

				<SupervisorSelector
					field='supervisorId'
					supervisors={supervisors}
					selectedSupervisorId={formData.supervisor_id as number}
					handleChange={handleSupervisorChange}
				/>

				<Button
					onClick={handleSubmit}
					color='blue'
					ripple={true}
					className='w-full md:w-auto'
				>
					Register
				</Button>

				<Link
					to={LOGIN_SCREEN}
					className='block mt-2 text-blue-500 hover:text-blue-700'
				>
					Already have an account? Sign in
				</Link>
			</div>
		</form>
	)
}

export default RegisterForm
