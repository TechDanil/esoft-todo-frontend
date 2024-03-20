import { useActions } from './useActions'

type FilterByCompletionDate = {
	userId: number
	startDate: Date
	endDate: Date
}

export const useFilter = () => {
	const {
		filterTasksByCompletionDate,
		filterTasksByAssignee,
		getAllTasksSortedByLastUpdated,
	} = useActions()

	const handleFilterTasksByCompletionDate = async ({
		userId,
		startDate,
		endDate,
	}: FilterByCompletionDate) => {
		await filterTasksByCompletionDate({ userId, startDate, endDate })
	}

	const handleFilterTasksByAssignee = async (userId: number) => {
		await filterTasksByAssignee({ userId })
	}

	const handleGetAllTasksSortedByLastUpdated = async (creator_id: number) => {
		await getAllTasksSortedByLastUpdated(creator_id)
	}

	return {
		handleFilterTasksByCompletionDate,
		handleFilterTasksByAssignee,
		handleGetAllTasksSortedByLastUpdated,
	}
}
