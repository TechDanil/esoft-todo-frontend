import { Button } from '@material-tailwind/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { ITask } from '../../../shared/interfaces/task.interface'
import { handleDateChange } from '../../../utils/handleDateChange/handleDateChange'
import Calendar from '../../ui/calendar/Calendar'

const TaskForm = () => {
	const { createTask, getResponsibleUsers } = useActions()
	const user = JSON.parse(localStorage.getItem('user') as string)
	const [taskData, setTaskData] = useState<ITask>({
		title: '',
		description: '',
		due_date: new Date(),
		priority: 'low',
		status: 'todo',
		assignee_id: user.supervisor_id,
	})

	useEffect(() => {
		getResponsibleUsers()
	}, [])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setTaskData({
			...taskData,
			[name]: value,
		})
	}

	const onDateChange = (date: Date) => {
		handleDateChange(date, setTaskData)
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await createTask({ userId: user?.id as number, task: taskData })
			setTaskData({
				title: '',
				description: '',
				due_date: new Date(),
				priority: 'low',
				status: 'todo',
				assignee_id: user.supervisor_id,
			})

			console.log('formData', taskData)
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<form className='flex flex-col justify-center items-center space-y-4 py-6 px-8 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-semibold'>Task Form</h2>
			<div className='w-full max-w-xs'>
				<div className='mb-4'>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-700'
					>
						Title
					</label>
					<input
						type='text'
						name='title'
						id='title'
						value={taskData.title}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
						placeholder='Enter your name'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='description'
						className='block text-sm font-medium text-gray-700'
					>
						Description
					</label>
					<input
						type='text'
						name='description'
						id='description'
						value={taskData.description}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
						placeholder='Enter your last name'
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='due_date'
						className='block text-sm font-medium text-gray-700'
					>
						Due Date
					</label>
					<Calendar selectedDate={taskData.due_date} onChange={onDateChange} />
				</div>
				<div className='mb-4'>
					<label
						htmlFor='priority'
						className='block text-sm font-medium text-gray-700'
					>
						Priority
					</label>
					<select
						name='priority'
						id='priority'
						value={taskData.priority}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
					>
						<option value='high'>High</option>
						<option value='medium'>Medium</option>
						<option value='low'>Low</option>
					</select>
				</div>

				<div className='mb-4'>
					<label
						htmlFor='status'
						className='block text-sm font-medium text-gray-700'
					>
						Status
					</label>
					<select
						name='status'
						id='status'
						value={taskData.status}
						onChange={handleChange}
						className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
					>
						<option value='todo'>Todo</option>
						<option value='in_progress'>In Progress</option>
						<option value='done'>Done</option>
						<option value='cancelled'>Cancelled</option>
					</select>
				</div>

				<Button
					onClick={handleSubmit}
					color='blue'
					ripple={true}
					className='w-full md:w-auto'
				>
					Create
				</Button>
			</div>
		</form>
	)
}

export default TaskForm
