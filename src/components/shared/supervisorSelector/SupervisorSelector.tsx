import { ChangeEvent } from 'react'
import { ISupervisor } from '../../../shared/interfaces/user.interface'

interface SupervisorSelectorProps {
	field: string
	supervisors: ISupervisor[]
	selectedSupervisorId: number
	handleChange: (supervisorId: number) => void
}

const SupervisorSelector = ({
	field,
	supervisors,
	selectedSupervisorId,
	handleChange,
}: SupervisorSelectorProps) => {
	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedId = parseInt(e.target.value, 10)
		handleChange(selectedId)
	}

	return (
		<div className='mb-4'>
			<label
				htmlFor={field}
				className='block text-sm font-medium text-gray-700'
			>
				Supervisor
			</label>
			<select
				name={field}
				id={field}
				value={selectedSupervisorId}
				onChange={handleSelectChange}
				className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
			>
				<option value='' disabled>
					Select supervisor
				</option>
				{supervisors.map(supervisor => (
					<option key={supervisor.id} value={supervisor.id}>
						{supervisor.login}
					</option>
				))}
			</select>
		</div>
	)
}

export default SupervisorSelector
