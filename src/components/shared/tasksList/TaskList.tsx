import { useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { ITask } from '../../../shared/interfaces/task.interface'
import { userSelector } from '../../../store/auth/auth.selectors'
import { tasksSelector } from '../../../store/task/tasks.selectors'
import Task from './task/Task'

const TaskList = () => {
	const tasks = useTypedSelector(tasksSelector)
	const user = useTypedSelector(userSelector)
	const { removeTask, editTask } = useActions()
	const [storedTasks, setStoredTasks] = useState<ITask[]>([])

	useEffect(() => {
		const storedTodos = JSON.parse(
			localStorage.getItem(`tasks-${user?.id}`) as string
		)
		if (storedTodos) {
			setStoredTasks(storedTodos)
		}
	}, [tasks])

	const handleRemoveTask = async (task: ITask) => {
		await removeTask({
			userId: task.userId as number,
			taskId: task.id as number,
		})

		const tasks: ITask[] = JSON.parse(
			localStorage.getItem(`tasks-${task.userId}`) || '[]'
		)

		const updatedTasks = tasks.filter(t => t.id !== task.id)
		localStorage.setItem(`tasks-${task.userId}`, JSON.stringify(updatedTasks))
		setStoredTasks(updatedTasks)
	}

	const handleEditTask = async (task: ITask) => {
		await editTask({
			userId: task.userId as number,
			taskId: task.id as number,
			taskData: task,
		})
		const index = storedTasks.findIndex(t => t.id === task.id)

		const updatedTasks = [...storedTasks]
		updatedTasks[index] = task
		setStoredTasks(updatedTasks)
		localStorage.setItem(`tasks-${task.userId}`, JSON.stringify(updatedTasks))
	}

	return (
		<ul className='divide-y divide-gray-200 flex  flex-col gap-4'>
			{storedTasks.map(task => (
				<Task
					key={task.id}
					task={task}
					onRemove={handleRemoveTask}
					handleEditTask={handleEditTask}
				/>
			))}
		</ul>
	)
}

export default TaskList
