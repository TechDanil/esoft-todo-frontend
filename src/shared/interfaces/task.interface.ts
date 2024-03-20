export type Priority = 'high' | 'medium' | 'low'
export type Status = 'todo' | 'in_progress' | 'done' | 'cancelled'

export interface ITask {
	id?: number
	title: string
	description: string
	due_date: Date
	priority: Priority
	status: Status
	userId?: number
	assignee_id?: number
	creator_id?: number
}

export interface ITaskCreation {
	userId: number
	task: ITask
}

export interface ITaskRemove {
	userId: number
	taskId: number
}

export interface ITaskEdit {
	userId: number
	taskId: number
	taskData: ITask
}
