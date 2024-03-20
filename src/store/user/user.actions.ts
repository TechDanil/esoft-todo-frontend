import { createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from '../../services/user.service'
import { ISupervisor } from '../../shared/interfaces/user.interface'

export const getResponsibleUsers = createAsyncThunk<ISupervisor[], void>(
	'user/getResponsibleUsers',
	async (_, { rejectWithValue }) => {
		try {
			const response = await userService.getResponsibleUsers()
			console.log('response', response)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
