import {NavLink, useNavigate} from 'react-router-dom'
import { routerNames } from '../../router.tsx'
import { Button } from '../FormComponents/Button/Button.tsx'
import * as React from 'react'
import styles from './sidebar.module.scss'
import clsx from 'clsx'
import {useEffect} from "react";
import {getUser, isAdministrator, isAuth, logout} from "../../Pages/Login/logout.ts";

const userImage = '/images/user.png'
export default function Sidebar() {
	const [isOpened, setIsOpened] = React.useState<boolean>(true);
	const navigate = useNavigate();
	const [user, setUser] = React.useState<any>();
	const isAdmin = isAdministrator();
	const handleLogout = () => {
		logout();
		navigate('/login');
	};
	useEffect(() => {
		if (!isAuth() || !getUser()) {
			handleLogout();
		} else {

			setUser(getUser());

		}
	}, []);
	const listItemClassName = (isActive: boolean) =>
		isActive
			? clsx(styles.list__item, styles.list__item_active)
			: styles.list__item

	return (
		<aside className={styles.sidebar}>
			<nav className={styles.navigation}>
				<ul className={styles.list}>
					<li>
						<NavLink
							to={'/tasks'}
							children={routerNames['/tasks']}
							className={({isActive}) =>
								clsx(listItemClassName(isActive), styles.list__item_requests)
							}
						/>
					</li>
					<li>
						<NavLink
							to={'/audience'}
							children={routerNames['/audience']}
							className={({isActive}) =>
								clsx(listItemClassName(isActive), styles.list__item_audience)
							}
						/>
					</li>

					<li
						onClick={(e) =>
							e.target.tagName === 'SPAN' && setIsOpened(!isOpened)
						}
					>
						<span
							className={clsx(
								styles.list__item,
								styles.list__item_reports,
								isOpened && styles.list__item_opened
							)}
						>
							{routerNames['/reports']}
						</span>

						<ul
							className={clsx(
								styles.sublist,
								isOpened && styles.sublist_opened,
								styles.list
							)}
						>
							<li>
								<NavLink
									to={'/reports/regions'}
									children={routerNames['/reports/regions']}
									className={({isActive}) => listItemClassName(isActive)}
								/>
							</li>
							<li>
								<NavLink
									to={'/reports/processed-requests-speed'}
									children={routerNames['/reports/processed-requests-speed']}
									className={({isActive}) => listItemClassName(isActive)}
								/>
							</li>
							<li>
								<NavLink
									to={'/reports/call-center'}
									children={routerNames['/reports/call-center']}
									className={({isActive}) => listItemClassName(isActive)}
								/>
							</li>
						</ul>
					</li>
					{isAdmin &&
						<>
					<li>
						<span
							className={clsx(
								styles.list__item,
								styles.list__item_admin,
							)}
						>
							{routerNames['/admin']}
						</span>
					</li>
						<li

						>


							<NavLink
								to={'/admin/users'}
								children={routerNames['/admin/users']}
								className={({isActive}) =>
									clsx(listItemClassName(isActive), styles.list__item_users)
								}
							/>

						</li>
					</>
					}
				</ul>
			</nav>
			<div className={styles.profile}>
				<div className={styles.profile__info}>
					<div className={styles.profile__avatar}>
						<img alt={'Avatar'} src={userImage}/>
					</div>
					<div className={styles.profile__text}>
						<span className={styles.profile__name}>

							{user?.name} {user?.surname}
						</span>
						<span className={styles.profile__role}>
							{user?.role === 'admin' ? 'Администратор' : 'Менеджер'}
						</span>
					</div>
				</div>
				<div className={styles.profile__settings}>
					<Button className={styles.profile__button}
							onClick={handleLogout}
					>
						<span className={styles.profile__logout}>Выйти</span>
					</Button>
				</div>
			</div>
		</aside>
	)
}
