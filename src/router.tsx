import { createBrowserRouter, Navigate } from 'react-router-dom'
import TasksPage from './Pages/TaskPage/TasksPage.tsx'
import CallCenterReport from './Pages/Reports/CallCenter/CallCenterReport.tsx'
import Layout from './Components/Layout/Layout.tsx'
import RegionsReport from './Pages/Reports/Regions/RegionsReport.tsx'
import ProcessedRequestsSpeedReport from './Pages/Reports/ProcessedRequestsSpeedReport.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
import * as React from 'react'
export const routerNames: { [key: string]: string } = {
	'/': 'Главная',
	'/tasks': 'Заявки',
	'/audience': 'Аудитория',
	'/advertisement': 'Реклама',
	'/reports': 'Отчеты',
	'/reports/regions': 'Регионы покупки недвижимости',
	'/reports/processed-requests-speed': 'Скорость отработанных заявок',
	'/reports/call-center': 'Колл-центр',
}

export const router = createBrowserRouter(
	[
		{
			path: '*',
			element: <NotFoundPage />,
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
					element: <Navigate to={'/'}/>,
				},
				{
					path: '/advertisement',
					element: <Navigate to={'/'} />,
				},
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
			],
		},
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
