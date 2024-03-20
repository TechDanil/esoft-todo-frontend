export interface IUser {
	id?: number
	name: string
	last_name: string
	surname: string
	login: string
	password?: string
	assignee_id?: number
}

export interface ISupervisor {
	id: number
	supervisorId: number
	login: string
}
