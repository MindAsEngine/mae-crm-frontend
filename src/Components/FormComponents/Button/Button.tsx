import { IClassNameProps } from '@bem-react/core'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React, { FC } from 'react'
import styles from './button.module.scss'
import clsx from 'clsx'

interface IButtonProps extends IClassNameProps {
	as?: React.ElementType
	children: React.ReactNode
	onClick?: () => void
	stylizedAs?: 'blue-dark' | 'blue-light' | 'white'
	exportButton?: 'blue' | 'white',
	createButton?: 'blue' | 'white',
	filterButton?: 'grey',
	disabled?: boolean,
}

export const Button: FC<IButtonProps> = ({
	children,
	className,
	as: Component = 'button',
	stylizedAs,
	exportButton,
	createButton,
	filterButton,
	disabled,
	...props
}) => {
	return (
		<Component {...props}
			disabled={disabled}
				   className={
			clsx(className, styles.button,
				(exportButton || createButton || filterButton) && styles.withBefore,
			{
				[styles.blueDark]: stylizedAs === 'blue-dark',
				[styles.blueLight]: stylizedAs === 'blue-light',
				[styles.white]: stylizedAs === 'white',
			},
				{
					[styles.exportWhite]: exportButton === 'white',
					[styles.exportBlue]: exportButton === 'blue',
				},
				{
					[styles.createWhite]: createButton === 'white',
					[styles.exportBlue]: createButton === 'blue',
				},
				{
					[styles.filterGrey]: filterButton === 'grey',
				},
				disabled && styles.disabled,
			)}>
			{children}
		</Component>
	)
}
