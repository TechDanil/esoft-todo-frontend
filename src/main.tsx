import { ThemeProvider } from '@material-tailwind/react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import AppRouter from './router/AppRouter'
import { store } from './store/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ThemeProvider>
			<AppRouter />
		</ThemeProvider>
	</Provider>
)
