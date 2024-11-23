import Sidebar from '../Sidebar/Sidebar.tsx'
import Header from '../Header/Header.tsx'
import { Outlet } from 'react-router-dom'
import * as React from 'react'
import styles from './Layout.module.scss'
import Switch from "../FormComponents/Switch/Switch.tsx";

export default function Layout() {
	const location = window.location.pathname;
	console.log(location)
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles.layout__content}>
				<Header />
				{location === '/tasks' || location === '/audience' ? <Switch/> : null}
				<Outlet />
			</div>
		</div>
	)
}
