import Sidebar from '../Sidebar/Sidebar.tsx'
import Header from '../Header/Header.tsx'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import * as React from 'react'
import styles from './layout.module.scss'
import Switch from "../FormComponents/Switch/Switch.tsx";
import {isAuth} from "../../Pages/Login/logout.ts";


export default function Layout() {
	const location = useLocation();
	if (!isAuth()){
		return <Navigate to={'/login'} replace={true}/>
	}
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
