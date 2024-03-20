import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../shared/interfaces/user.interface'
import { login, logout, register } from './auth.actions'

interface IInitialState {
	user: IUser | null
	error: string | null
	isLoading: boolean
	isError: boolean
	isAuth: boolean
}

const storedUser = localStorage.getItem('user')
const initialState: IInitialState = {
	user: storedUser ? JSON.parse(storedUser) : null,
	error: null,
	isLoading: false,
	isError: false,
	isAuth: false,
}

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(register.pending, state => {
			state.isLoading = true
			state.isError = false
		})
		builder.addCase(register.fulfilled, (state, action) => {
			state.user = action.payload.user
			state.error = null
			state.isLoading = false
			state.isError = false
			state.isAuth = true
		})
		builder.addCase(register.rejected, (state, action) => {
			state.user = null
			state.error = action.payload as string
			state.isLoading = false
			state.isError = true
			state.isAuth = false
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload.user
			state.error = null
			state.isLoading = false
			state.isError = false
			state.isAuth = true
		})
		builder.addCase(login.rejected, (state, action) => {
			state.user = null
			state.error = action.payload as string
			state.isLoading = false
			state.isError = true
			state.isAuth = false
		})
		builder.addCase(logout.fulfilled, state => {
			state.user = null
			state.isLoading = false
			state.isError = false
			state.isAuth = false
		})
	},
})

export default AuthSlice.reducer
