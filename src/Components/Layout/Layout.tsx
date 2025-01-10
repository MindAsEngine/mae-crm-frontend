import Sidebar from '../Sidebar/Sidebar.tsx'
import Header from '../Header/Header.tsx'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import * as React from 'react'
import styles from './layout.module.scss'
import Switch from "../FormComponents/Switch/Switch.tsx";
import {useEffect} from "react";
import {isAuth, logout} from "../../Pages/Login/logout.ts";

export default function Layout() {
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuth()) {
			navigate('/login');
			logout();
		}
	}, []);
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
