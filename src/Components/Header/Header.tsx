import { cn } from '@bem-react/classname'
import { NavLink, useLocation } from 'react-router-dom'
import { routerNames } from '../../router.tsx'

export default function Header() {
	const location = useLocation()
	const pathnames = location.pathname.split('/').filter((x) => x)
	const cnHeader = cn('Header')
	const cnBreadcrumb = cn('Breadcrumb')

	return (
		<header className={cnHeader()}>
			<nav className={cnBreadcrumb()}>
				<NavLink
					to={'/'}
					className={cnBreadcrumb('Link')}
					children={'Главная'}
				/>

				{pathnames.map((name, index) => {
					const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
					return (
						<NavLink
							to={routeTo}
							key={name}
							className={({ isActive }) =>
								isActive
									? cnBreadcrumb('Link', { active: true })
									: cnBreadcrumb('Link')
							}
							children={routerNames[routeTo]}
						/>
					)
				})}
			</nav>
			<h1 className={cnHeader('Title')}>{routerNames[location.pathname]}</h1>
		</header>
	)
}
