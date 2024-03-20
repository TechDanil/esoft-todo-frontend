import { createSlice } from '@reduxjs/toolkit'
import { ISupervisor } from '../../shared/interfaces/user.interface'
import { getResponsibleUsers } from './user.actions'

interface IInitialState {
	supervisors: ISupervisor[]
	error: string | null
	isLoading: boolean
	isError: boolean
}

const initialState: IInitialState = {
	supervisors: [],
	error: null,
	isLoading: false,
	isError: false,
}

const UserSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getResponsibleUsers.pending, state => {
			state.isLoading = true
			state.isError = false
		})
		builder.addCase(getResponsibleUsers.fulfilled, (state, action) => {
			state.supervisors = action.payload
			console.log('state.supervisors', state.supervisors)
			state.error = null
			state.isLoading = false
			state.isError = false
		})
		builder.addCase(getResponsibleUsers.rejected, (state, action) => {
			state.supervisors = []
			state.error = action.payload as string
			state.isLoading = false
			state.isError = true
		})
	},
})

export default UserSlice.reducer
