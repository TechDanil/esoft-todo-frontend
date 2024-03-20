import { AxiosError, AxiosResponse } from 'axios'
import { instance } from '../api/api.interceptor'
import {
	ILoginRequest,
	ILoginResponse,
	IRefreshResponse,
	IRegisterRequest,
	IRegisterResponse,
} from '../shared/interfaces/auth.interface'
import { handleApiError } from '../utils/handleApiError/handleApiError'

export const authService = {
	register: async ({
		name,
		last_name,
		surname,
		login,
		password,
	}: IRegisterRequest): Promise<AxiosResponse<IRegisterResponse>> => {
		try {
			const response = instance.post<IRegisterResponse>(
				`auth/register`,
				{ name, last_name, surname, login, password },
				{ withCredentials: true }
			)

			return response
		} catch (error) {
			throw handleApiError(error as AxiosError)
		}
	},

	login: async ({
		login,
		password,
	}: ILoginRequest): Promise<AxiosResponse<ILoginResponse>> => {
		try {
			const response = instance.post<ILoginResponse>(`auth/login`, {
				login,
				password,
			})

			return response
		} catch (error) {
			throw handleApiError(error as AxiosError)
		}
	},

	logout: async (): Promise<AxiosResponse> => {
		return instance.post<void>('auth/logout')
	},

	refresh: async (): Promise<AxiosResponse<IRefreshResponse>> => {
		return instance.get<IRefreshResponse>(`auth/refresh`, {
			withCredentials: true,
		})
	},
}
