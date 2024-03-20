import { Dispatch, SetStateAction } from 'react'
import { ITask } from '../../shared/interfaces/task.interface'

export const handleDateChange = (
	date: Date,
	setTaskData: Dispatch<SetStateAction<ITask>>
) => {
	setTaskData(prevTaskData => ({
		...prevTaskData,
		due_date: date,
	}))
}
