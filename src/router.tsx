import { createBrowserRouter, Navigate } from 'react-router-dom'
import TasksPage from './Pages/TaskPage/TasksPage.tsx'
import CallCenterReport from './Pages/Reports/CallCenter/CallCenterReport.tsx'
import Layout from './Components/Layout/Layout.tsx'
import RegionsReport from './Pages/Reports/Regions/RegionsReport.tsx'
import ProcessedRequestsSpeedReport from './Pages/Reports/Speed/ProcessedRequestsSpeedReport.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
import * as React from 'react'
import UsersPage from "./Pages/Admin/UsersPage.tsx";
import AudiencePage from "./Pages/AudiencePage/AudiencePage.tsx";
import LoginPage from "./Pages/Login/Login.tsx";
export const routerNames: { [key: string]: string } = {
	'/': 'Главная',
	'/tasks': 'Заявки',
	'/audience': 'Аудитория',
	// '/login': 'Вход',
	// '/admin': 'АДМИН',
	// '/admin/users': 'Пользователи',
	// '/advertisement': 'Реклама',
	'/reports': 'Отчеты',
	'/reports/regions': 'Регионы покупки недвижимости',
	'/reports/processed-requests-speed': 'Скорость отработанных заявок',
	'/reports/call-center': 'Колл-центр',
}

export const router = createBrowserRouter(
	[
		{
			path: '*',
			element: <Navigate to={'/tasks'}/>
			// element: <NotFoundPage />,
		},
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Navigate to={'/tasks'}/>
				},
				{
					path: '/tasks',
					element: <TasksPage />,
				},
				{
					path: '/audience',
					element: <AudiencePage/>,
				},
				// {
				// 	path: '/advertisement',
				// 	element: <Navigate to={'/'} />,
				// },
				{
					path: '/reports',
					children: [
						{
							index: true,
							element: <Navigate to={'regions'} />,
						},
						{
							path: 'regions',
							element: <RegionsReport />,
						},
						{
							path: 'call-center',
							element: <CallCenterReport />,
						},
						{
							path: 'processed-requests-speed',
							element: <ProcessedRequestsSpeedReport />,
						},
					],
				},
		// 		{
		// 			path: '/admin',
		// 			children: [
		// 				{
		// 					index: true,
		// 					element: <Navigate to={'users'} />,
		// 				},
		// 				{
		// 					path: 'users',
		// 					element: <UsersPage />,
		// 				}
		// 				]
		// 		}
			],
		},
		// {
		// 	path: '/login',
		// 	element: <LoginPage/>,
		// }
	],
	{
		future: {
			v7_relativeSplatPath: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_skipActionErrorRevalidation: true,
		},
	}
)
