import { useState } from 'react'
import { ITask } from '../../../../shared/interfaces/task.interface'
import Modal from '../../../ui/modal/Modal'
import EditForm from '../../EditForm/EditForm'

interface ITaskProps {
	task: ITask
	onRemove: (task: ITask) => void
	handleEditTask: (task: ITask) => void
}

const Task = ({ task, onRemove, handleEditTask }: ITaskProps) => {
	const [isOpenModal, setOpenModal] = useState(false)

	const openModal = () => {
		setOpenModal(true)
	}

	const closeModal = () => {
		setOpenModal(false)
	}

	const getTitleColor = () => {
		const currentDate = new Date()
		const dueDate = new Date(task.due_date)

		if (task.status === 'done') {
			return 'text-green-500'
		} else if (dueDate < currentDate) {
			return 'text-red-500'
		} else {
			return 'text-gray-500'
		}
	}

	return (
		<div className='bg-white shadow overflow-hidden sm:rounded-lg'>
			<div className='px-4 py-5 sm:px-6'>
				<h3 className={`text-lg leading-6 font-medium ${getTitleColor()}`}>
					{task.title}
				</h3>
				<p className='mt-1 max-w-2xl text-sm text-gray-500'>
					{task.description}
				</p>
			</div>
			<div className='border-t border-gray-200'>
				<dl>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>Due Date</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
							{new Date(task.due_date).toISOString().split('T')[0]}
						</dd>
					</div>
					<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>Priority</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
							{task.priority}
						</dd>
					</div>
					<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-sm font-medium text-gray-500'>Status</dt>
						<dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
							{task.status}
						</dd>
					</div>
				</dl>
			</div>
			<div className='border-t border-gray-200 px-4 py-4 flex justify-end'>
				<button
					onClick={() => onRemove(task)}
					className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
				>
					Remove
				</button>
				<button
					onClick={openModal}
					className='inline-flex items-center ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
				>
					Edit
				</button>
			</div>
			{isOpenModal && (
				<Modal handleModalClose={closeModal}>
					<EditForm
						task={task}
						handleEditTask={handleEditTask}
						closeModal={closeModal}
					/>
				</Modal>
			)}
		</div>
	)
}

export default Task
