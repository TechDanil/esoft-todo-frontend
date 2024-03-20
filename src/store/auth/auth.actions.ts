import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/auth.service'
import {
	ILoginRequest,
	ILoginResponse,
	IRegisterRequest,
	IRegisterResponse,
} from '../../shared/interfaces/auth.interface'
import { IUser } from '../../shared/interfaces/user.interface'
import { removeToken, saveToken } from '../../utils/token/token'

export const register = createAsyncThunk<IRegisterResponse, IRegisterRequest>(
	'auth/register',
	async (data, { rejectWithValue }) => {
		try {
			const response = await authService.register(data)

			if (response.data) {
				const token = response.data.accessToken
				saveToken(token)
			}

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...userData } = data

			const createdUser: IUser = {
				...data,
				id: response.data.user.id,
			}

			localStorage.setItem('user', JSON.stringify(createdUser))
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
	'auth/login',
	async ({ login, password }, { rejectWithValue }) => {
		try {
			const response = await authService.login({
				login,
				password,
			})

			if (response.data) {
				const token = response.data.accessToken
				saveToken(token)
			}

			// const userData: IUser = JSON.parse(localStorage.getItem('user') as string)

			// localStorage.setItem(
			// 	'user',
			// 	JSON.stringify({
			// 		id: response.data.user.id,
			// 		password: response.data.user.password,
			// 		name: response.data.user.name,
			// 	})
			// )

			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk<void, void>(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await authService.logout()

			if (response.data) {
				removeToken()
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
