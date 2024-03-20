import { createSlice } from '@reduxjs/toolkit'
import { ITask } from '../../shared/interfaces/task.interface'
import { IUser } from '../../shared/interfaces/user.interface'
import {
	createTask,
	editTask,
	fetchAllTasks,
	filterTasksByAssignee,
	filterTasksByCompletionDate,
	getAllTasksSortedByLastUpdated,
	removeTask,
} from './tasks.actions'

interface IInitialState {
	tasks: ITask[]
	error: string | null
	isLoading: boolean
	isError: boolean
}

const initialState: IInitialState = {
	tasks: [],
	error: null,
	isLoading: false,
	isError: false,
}

const TasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(createTask.pending, state => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.tasks.push(action.payload)
				state.isLoading = false
				state.isError = false
			})
			.addCase(createTask.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(fetchAllTasks.pending, state => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(fetchAllTasks.fulfilled, (state, action) => {
				state.tasks = action.payload
				state.isLoading = false
				state.isError = false
			})
			.addCase(fetchAllTasks.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(editTask.pending, state => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(editTask.fulfilled, (state, action) => {
				const updatedTask = action.payload
				const index = state.tasks.findIndex(task => task.id === updatedTask.id)
				if (index !== -1) {
					state.tasks[index] = updatedTask
				}
				state.isLoading = false
				state.isError = false
			})
			.addCase(editTask.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(removeTask.pending, state => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				const taskIdToRemove = action.payload
				state.tasks = state.tasks.filter(task => task.id !== taskIdToRemove)
				state.isLoading = false
				state.isError = false
			})
			.addCase(removeTask.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(filterTasksByCompletionDate.fulfilled, (state, action) => {
				const filteredTasks = action.payload as ITask[]
				const user: IUser = JSON.parse(localStorage.getItem('user') as string)
				const storedTasks = JSON.parse(
					localStorage.getItem(`tasks-${user.id}`) || '[]'
				) as ITask[]
				const updatedTasks = storedTasks.filter(task =>
					filteredTasks.some(filteredTask => filteredTask.id === task.id)
				)
				localStorage.setItem(`tasks-${user.id}`, JSON.stringify(updatedTasks))
				state.tasks = updatedTasks
				state.isLoading = false
				state.isError = false
			})
			.addCase(filterTasksByAssignee.fulfilled, (state, action) => {
				const filteredTasks = action.payload as ITask[]
				const user: IUser = JSON.parse(localStorage.getItem('user') as string)

				const storedTasks = JSON.parse(
					localStorage.getItem(`tasks-${user.id}`) || '[]'
				) as ITask[]
				const updatedTasks = storedTasks.filter(task =>
					filteredTasks.some(filteredTask => filteredTask.id === task.id)
				)
				localStorage.setItem(`tasks-${user.id}`, JSON.stringify(updatedTasks))
				state.tasks = updatedTasks
				state.isLoading = false
				state.isError = false
			})
			.addCase(getAllTasksSortedByLastUpdated.fulfilled, (state, action) => {
				const allTasks = action.payload as ITask[]
				const user: IUser = JSON.parse(localStorage.getItem('user') as string)
				const storedTasks = JSON.parse(
					localStorage.getItem(`tasks-${user.id}`) || '[]'
				) as ITask[]
				const updatedTasks = storedTasks.filter(task =>
					allTasks.some(allTask => allTask.id === task.id)
				)
				localStorage.setItem(`tasks-${user.id}`, JSON.stringify(updatedTasks))
				state.tasks = updatedTasks
				state.isLoading = false
				state.isError = false
			})
	},
})

export default TasksSlice.reducer
