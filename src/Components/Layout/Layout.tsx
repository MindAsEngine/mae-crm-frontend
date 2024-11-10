import Sidebar from '../Sidebar/Sidebar.tsx'
import { cn } from '@bem-react/classname'
import Header from '../Header/Header.tsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {
	const cnContent = cn('Content')
	return (
		<div>
			<Sidebar />
			<div className={cnContent()}>
				<Header />
				<Outlet />
			</div>
		</div>
	)
}
