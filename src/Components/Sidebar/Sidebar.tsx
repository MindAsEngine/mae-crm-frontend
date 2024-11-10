import { cn } from '@bem-react/classname'
import { NavLink } from 'react-router-dom'
import { routerNames } from '../../router.tsx'
import { Button } from '../Button/Button.tsx'

export default function Sidebar() {
	const cnSidebar = cn('Sidebar')
	const cnNavigation = cn('Navigation')
	const cnLogo = cn('Logo')
	const cnUserBlock = cn('UserBlock')
	const linkClassName = (isActive: boolean) =>
		isActive ? cnNavigation('Link', { active: true }) : cnNavigation('Link')
	return (
		<aside className={cnSidebar()}>
			<img
				className={cnLogo({ placed: cnSidebar() })}
				alt={'Golden House Logo'}
			/>
			<nav className={cnNavigation()}>
				<ul className={cnNavigation('List')}>
					<li>
						<NavLink
							to={'/tasks'}
							children={routerNames['/tasks']}
							className={({ isActive }) => linkClassName(isActive)}
						/>
					</li>
					<li>
						<NavLink
							to={'/audience'}
							children={routerNames['/audience']}
							className={({ isActive }) => linkClassName(isActive)}
						/>
					</li>
					<li>
						<NavLink
							to={'/advertisement'}
							children={routerNames['/advertisement']}
							className={({ isActive }) => linkClassName(isActive)}
						/>
					</li>
					<li>
						<span className={cnNavigation('Link')}>
							{routerNames['/reports']}
						</span>
						<span>
							<img alt={'>'} />
						</span>
						<ul>
							<li>
								<NavLink
									to={'/reports/call-center'}
									children={routerNames['/reports/call-center']}
									className={({ isActive }) => linkClassName(isActive)}
								/>
							</li>
							<li>
								<NavLink
									to={'/reports/regions'}
									children={routerNames['/reports/regions']}
									className={({ isActive }) => linkClassName(isActive)}
								/>
							</li>
							<li>
								<NavLink
									to={'/reports/processed-requests-speed'}
									children={routerNames['/reports/processed-requests-speed']}
									className={({ isActive }) => linkClassName(isActive)}
								/>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
			<div className={cnUserBlock()}>
				<div className={cnUserBlock('Info')}>
					<div className={cnUserBlock('Avatar')}>
						<img alt={'User Avatar'} />
					</div>
					<div className={cnUserBlock('Name')}>
						<span>Иван Иванов</span>
						<span>Менеджер</span>
					</div>
				</div>
				<Button className={cnUserBlock('Logout')}>
					<img alt={'Logout'} />
					Выйти
				</Button>
			</div>
		</aside>
	)
}
