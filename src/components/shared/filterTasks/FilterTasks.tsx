import { useState } from 'react'
import { useFilter } from '../../../hooks/useFilter'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { userSelector } from '../../../store/auth/auth.selectors'
import Calendar from '../../ui/calendar/Calendar'

const FilterTasks = () => {
	const user = useTypedSelector(userSelector)

	const {
		handleFilterTasksByCompletionDate,
		handleFilterTasksByAssignee,
		handleGetAllTasksSortedByLastUpdated,
	} = useFilter()

	const [startDate, setStartDate] = useState<Date | null>(null)
	const [endDate, setEndDate] = useState<Date | null>(null)

	const handleFilterByCompletionDate = async () => {
		if (startDate && endDate) {
			handleFilterTasksByCompletionDate({
				userId: user?.id as number,
				startDate,
				endDate,
			})
		} else {
			console.error('Please select both start and end dates.')
		}
	}

	const handleFilterByAssignee = async () => {
		if (user?.assignee_id) {
			handleFilterTasksByAssignee(user.assignee_id)
		} else {
			console.error('No assignee_id')
		}
	}

	const handleGetAllTasks = async () => {
		if (user?.id) {
			handleGetAllTasksSortedByLastUpdated(user?.id)
		} else {
			console.error('No creator id')
		}
	}

	const handleStartDateChange = (date: Date | null) => {
		setStartDate(date)
	}

	const handleEndDateChange = (date: Date | null) => {
		setEndDate(date)
	}

	return (
		<div className='max-w-md mx-auto p-4'>
			<div className='flex justify-center space-x-4 mb-4'>
				<button
					onClick={handleFilterByCompletionDate}
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
				>
					Filter by Completion Date
				</button>
				<button
					onClick={handleFilterByAssignee}
					disabled={!user?.assignee_id}
					className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
						!user?.assignee_id && 'opacity-50 cursor-not-allowed'
					}`}
				>
					Filter by Assignee
				</button>

				<button
					onClick={handleGetAllTasks}
					className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
				>
					Get All Tasks
				</button>
			</div>
			<div className='flex space-x-4'>
				<div>
					<p className='text-gray-700'>Start Date</p>
					<Calendar
						selectedDate={startDate as Date}
						onChange={handleStartDateChange}
					/>
				</div>
				<div>
					<p className='text-gray-700'>End Date</p>
					<Calendar
						selectedDate={endDate as Date}
						onChange={handleEndDateChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default FilterTasks
