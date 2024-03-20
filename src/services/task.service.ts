import { AxiosResponse } from 'axios'
import { instance } from '../api/api.interceptor'
import {
	IFilterByAssigneeRequest,
	IFilterByCompletionDateRequest,
	IFilterResponse,
} from '../shared/interfaces/filter.interface'
import { ITask } from '../shared/interfaces/task.interface'

export const taskService = {
	getAllTasks: async (userId: number): Promise<AxiosResponse<ITask[]>> => {
		return instance.get(`task/getAllTasks/${userId}`)
	},

	createTask: async (
		userId: number,
		data: ITask
	): Promise<AxiosResponse<ITask>> => {
		return instance.post(`task/createTask/${userId}`, data)
	},

	removeTask: async (
		userId: number,
		taskId: number
	): Promise<AxiosResponse<void>> => {
		return instance.delete(`task/removeTask/${userId}/${taskId}`)
	},

	editTask: async (
		userId: number,
		taskId: number,
		data: ITask
	): Promise<AxiosResponse<ITask>> => {
		return instance.patch(`task/editTask/${userId}/${taskId}`, data)
	},

	filterTasksByCompletionDate: async (
		requestData: IFilterByCompletionDateRequest
	): Promise<AxiosResponse<IFilterResponse[]>> => {
		return instance.post<IFilterResponse[]>(
			'task/filterByCompletionDate',
			requestData,
			{ withCredentials: true }
		)
	},

	filterTasksByAssignee: async (
		requestData: IFilterByAssigneeRequest
	): Promise<AxiosResponse<IFilterResponse[]>> => {
		return instance.post<IFilterResponse[]>(
			'task/filterByAssignee',
			requestData,
			{
				withCredentials: true,
			}
		)
	},

	getAllTasksSortedByLastUpdated: async (
		creator_id: number
	): Promise<AxiosResponse<IFilterResponse[]>> => {
		return instance.get<IFilterResponse[]>(
			`task/filterSortedByLastUpdated/${creator_id}`
		)
	},
}
