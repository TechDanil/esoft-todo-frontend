import FilterTasks from '../../shared/filterTasks/FilterTasks'
import TaskForm from '../../shared/taskForm/TaskForm'
import TaskList from '../../shared/tasksList/TaskList'
import Logout from '../../ui/logout/Logout'

const Tasks = () => {
	return (
		<div className='container mx-auto px-4 p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					<div className='bg-white shadow-md rounded-lg p-4'>
						<TaskForm />
					</div>

					<h2 className='text-center text-2xl font-semibold mt-8 mb-4'>
						Todos
					</h2>
					<div className='flex justify-center'>
						<TaskList />
					</div>
				</div>

				<div className='mt-2 sm:mx-auto'>
					<Logout />
					<FilterTasks />
				</div>
			</div>
		</div>
	)
}

export default Tasks
