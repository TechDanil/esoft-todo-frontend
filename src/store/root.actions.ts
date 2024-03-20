import * as AuthActions from './auth/auth.actions'
import * as TasksActions from './task/tasks.actions'
import * as UserActions from './user/user.actions'

export const rootActions = {
	...AuthActions,
	...UserActions,
	...TasksActions,
}
