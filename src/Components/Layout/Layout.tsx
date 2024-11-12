import Sidebar from '../Sidebar/Sidebar.tsx'
import Header from '../Header/Header.tsx'
import { Outlet } from 'react-router-dom'
import * as React from 'react'
import styles from './Layout.module.scss'

export default function Layout() {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles.layout__content}>
				<Header />
				<Outlet />
			</div>
		</div>
	)
}
