import { NavLink, useLocation } from 'react-router-dom'
import { routerNames } from '../../router.tsx'
import * as React from 'react'
import styles from './Header.module.scss'
import clsx from 'clsx'

export default function Header() {
	const location = useLocation()
	const pathnames = location.pathname.split('/').filter((x) => x)

	return (
		<header className={styles.header}>
			<nav className={styles.breadcrumb}>
				<NavLink
					to={'/'}
					className={({ isActive }) =>
						isActive
							? clsx(styles.breadcrumb__link, styles.breadcrumb__link_active)
							: styles.breadcrumb__link
					}
					children={'Главная'}
				/>

				{pathnames.map((name, index) => {
					const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
					if (
						routerNames[routeTo] === undefined ||
						routerNames[routeTo] === 'Отчеты' ||
						routerNames[routeTo] === 'АДМИН'
					) {
						return null
					}
					return (
						<NavLink
							to={routeTo}
							key={name}
							className={({ isActive }) =>
								isActive
									? clsx(
											styles.breadcrumb__link,
											styles.breadcrumb__link_active
										)
									: styles.breadcrumb__link
							}
							children={routerNames[routeTo]}
						/>
					)
				})}
			</nav>
			<h1 className={styles.title}>{routerNames[location.pathname]}</h1>
		</header>
	)
}
