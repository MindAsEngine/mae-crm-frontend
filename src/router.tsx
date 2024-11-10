import { createBrowserRouter, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CallCenterReport from './Pages/Reports/CallCenterReport.tsx'
import Layout from './Components/Layout/Layout.tsx'
import RegionsReport from './Pages/Reports/RegionsReport.tsx'
import ProcessedRequestsSpeedReport from './Pages/Reports/ProcessedRequestsSpeedReport.tsx'
import NotFoundPage from './Pages/NotFoundPage.tsx'
export const routerNames: { [key: string]: string } = {
	'/': 'Главная',
	'/tasks': 'Задачи/Заявки',
	'/audience': 'Аудитория',
	'/advertisement': 'Реклама',
	'/reports': 'Отчеты',
	'/reports/call-center': 'Колл-центр',
	'/reports/regions': 'Регионы покупки недвижимости',
	'/reports/processed-requests-speed': 'Скорость отработанных заявок',
}

export const router = createBrowserRouter([
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
				element: <HomePage />,
			},
			{
				path: '/tasks',
				element: <Navigate to={'/'} />,
			},
			{
				path: '/audience',
				element: <Navigate to={'/'} />,
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
])
