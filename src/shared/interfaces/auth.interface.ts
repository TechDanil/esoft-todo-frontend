import { IUser } from './user.interface'

export interface IRegisterRequest {
	name: string
	last_name: string
	surname: string
	login: string
	password: string
	supervisor_id?: number
}

export interface IRegisterResponse {
	user: IUser
	accessToken: string
}

export interface ILoginRequest {
	login: string
	password: string
}

export interface ILoginResponse {
	user: IUser
	accessToken: string
}

export interface IRefreshResponse {
	accessToken: string
}
