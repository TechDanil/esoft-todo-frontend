import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface ICalendarProps {
	selectedDate: Date
	onChange: (date: Date) => void
}

const Calendar = ({ selectedDate, onChange }: ICalendarProps) => {
	return (
		<ReactDatePicker
			selected={selectedDate}
			onChange={onChange}
			className='mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm'
		/>
	)
}

export default Calendar
