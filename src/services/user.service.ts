import { AxiosError, AxiosResponse } from 'axios'
import { instance } from '../api/api.interceptor.js'
import { ISupervisor } from '../shared/interfaces/user.interface.js'
import { handleApiError } from '../utils/handleApiError/handleApiError.js'

export const userService = {
	getResponsibleUsers: async (): Promise<AxiosResponse<ISupervisor[]>> => {
		try {
			const response = instance.get<ISupervisor[]>(`user/getResponsibleUsers`)

			console.log('response', response)

			return response
		} catch (error) {
			throw handleApiError(error as AxiosError)
		}
	},
}
