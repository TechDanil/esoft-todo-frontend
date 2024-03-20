import { createAsyncThunk } from '@reduxjs/toolkit'
import { taskService } from '../../services/task.service'
import {
	IFilterByAssigneeRequest,
	IFilterByCompletionDateRequest,
} from '../../shared/interfaces/filter.interface'
import {
	ITask,
	ITaskCreation,
	ITaskEdit,
	ITaskRemove,
} from '../../shared/interfaces/task.interface'

export const createTask = createAsyncThunk<ITask, ITaskCreation>(
	'task/createTask',
	async ({ userId, task }, { rejectWithValue }) => {
		try {
			const response = await taskService.createTask(userId, task)
			const tasks: ITask[] = JSON.parse(
				localStorage.getItem(`tasks-${userId}`) || '[]'
			)
			const updatedTask = { ...task, id: response.data.id, userId: userId }
			tasks.push(updatedTask)
			localStorage.setItem(`tasks-${userId}`, JSON.stringify(tasks))
			return response.data
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const fetchAllTasks = createAsyncThunk<ITask[], number>(
	'task/fetchAllTasks',
	async (userId, { rejectWithValue }) => {
		try {
			const response = await taskService.getAllTasks(userId)
			return response.data
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const removeTask = createAsyncThunk<void, ITaskRemove>(
	'task/removeTask',
	async ({ userId, taskId }, { rejectWithValue }) => {
		try {
			await taskService.removeTask(userId, taskId)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const editTask = createAsyncThunk<ITask, ITaskEdit>(
	'task/editTask',
	async ({ userId, taskId, taskData }, { rejectWithValue }) => {
		try {
			const response = await taskService.editTask(userId, taskId, taskData)
			return response.data
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const filterTasksByCompletionDate = createAsyncThunk(
	'task/filterByCompletionDate',
	async (requestData: IFilterByCompletionDateRequest, { rejectWithValue }) => {
		try {
			const response = await taskService.filterTasksByCompletionDate(
				requestData
			)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const filterTasksByAssignee = createAsyncThunk(
	'task/filterByAssignee',
	async (requestData: IFilterByAssigneeRequest, { rejectWithValue }) => {
		try {
			const response = await taskService.filterTasksByAssignee(requestData)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const getAllTasksSortedByLastUpdated = createAsyncThunk(
	'task/filterSortedByLastUpdated',
	async (creator_id: number, { rejectWithValue }) => {
		try {
			const response = await taskService.getAllTasksSortedByLastUpdated(
				creator_id
			)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
