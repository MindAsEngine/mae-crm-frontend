import Sidebar from '../Sidebar/Sidebar.tsx'
import Header from '../Header/Header.tsx'
import {Outlet, useLocation} from 'react-router-dom'
import * as React from 'react'
import styles from './Layout.module.scss'
import Switch from "../FormComponents/Switch/Switch.tsx";

export default function Layout() {
	const location = useLocation();
	console.log(location.pathname, "location");
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles.layout__content}>
				<Header />
				{location.pathname === '/tasks' || location.pathname === '/audience' ? <Switch/> : null}
				<Outlet />
			</div>
		</div>
	)
}
