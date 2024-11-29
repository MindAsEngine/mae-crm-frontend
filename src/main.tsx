import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/normalize.scss'
import './styles/font.scss'
import './styles/color.scss'
import './styles/effect.scss'
import './styles/border.scss'
import './styles/icon.scss'
import './styles/scrollbar.scss'
import { router } from './router'
import * as React from 'react'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider
			router={router}
			future={{
				v7_startTransition: true,
			}}
		/>
	</StrictMode>
)
