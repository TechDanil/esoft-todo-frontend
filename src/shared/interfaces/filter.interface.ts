import { ITask } from './task.interface'

export interface IFilterByCompletionDateRequest {
	userId: number
	startDate: Date
	endDate: Date
}

export interface IFilterByAssigneeRequest {
	userId: number
}

export interface IFilterResponse extends ITask {
	id: number
	task: ITask
}
