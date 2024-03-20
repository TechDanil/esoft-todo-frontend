import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './auth/auth.slice'
import TasksSlice from './task/tasks.slice'
import UserSlice from './user/user.slice'

export const store = configureStore({
	reducer: {
		auth: AuthSlice,
		user: UserSlice,
		tasks: TasksSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
