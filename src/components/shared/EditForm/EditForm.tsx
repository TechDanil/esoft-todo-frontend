import { useState } from 'react'
import {
	ITask,
	Priority,
	Status,
} from '../../../shared/interfaces/task.interface'
import { handleDateChange } from '../../../utils/handleDateChange/handleDateChange'
import Calendar from '../../ui/calendar/Calendar'

interface IEditFormProps {
	task: ITask
	handleEditTask: (task: ITask) => void
	closeModal: () => void
}

const EditForm = ({ task, handleEditTask, closeModal }: IEditFormProps) => {
	const [editedTask, setEditedTask] = useState<ITask>({ ...task })

	const onChangeDate = (date: Date) => {
		handleDateChange(date, setEditedTask)
	}

	const onSave = () => {
		handleEditTask(editedTask)
		closeModal()
	}

	return (
		<>
			<div className='px-4 py-5 sm:px-6'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>
					<input
						type='text'
						value={editedTask.title}
						onChange={e =>
							setEditedTask({ ...editedTask, title: e.target.value })
						}
						className='w-full border-b border-gray-200 focus:outline-none focus:border-blue-500'
					/>
				</h3>
				<p className='mt-1 max-w-2xl text-sm text-gray-500'>
					<textarea
						value={editedTask.description}
						onChange={e =>
							setEditedTask({ ...editedTask, description: e.target.value })
						}
						className='w-full border-b border-gray-200 focus:outline-none focus:border-blue-500'
					/>
				</p>
			</div>
			<div className='border-t border-gray-200'>
				<dl>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>Due Date</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
							<Calendar
								selectedDate={
									new Date(editedTask.due_date).toISOString().split('T')[0]
								}
								onChange={onChangeDate}
							/>
						</dd>
					</div>
					<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>Priority</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
							<select
								value={editedTask.priority}
								onChange={e =>
									setEditedTask({
										...editedTask,
										priority: e.target.value as Priority,
									})
								}
								className='w-full border-b border-gray-200 focus:outline-none focus:border-blue-500'
							>
								<option value='low'>Low</option>
								<option value='medium'>Medium</option>
								<option value='high'>High</option>
							</select>
						</dd>
					</div>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>Status</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
							<select
								value={editedTask.status}
								onChange={e =>
									setEditedTask({
										...editedTask,
										status: e.target.value as Status,
									})
								}
								className='w-full border-b border-gray-200 focus:outline-none focus:border-blue-500'
							>
								<option value='todo'>Todo</option>
								<option value='in_progress'>In Progress</option>
								<option value='done'>Done</option>
								<option value='cancelled'>Cancelled</option>
							</select>
						</dd>
					</div>
				</dl>
			</div>
			<button
				onClick={onSave}
				className='inline-flex mt-2 items-center ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
			>
				Save
			</button>
		</>
	)
}

export default EditForm
