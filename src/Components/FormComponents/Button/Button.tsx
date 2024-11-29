import { IClassNameProps } from '@bem-react/core'
import React, { FC } from 'react'
import styles from './button.module.scss'
import clsx from 'clsx'
interface IButtonProps extends IClassNameProps {
	as?: React.ElementType
	children: React.ReactNode
	onClick?: () => void
	stylizedAs?: 'blue-dark' | 'blue-light' | 'white' | 'red'
	exportButton?: boolean,
	createButton?: boolean,
	filterButton?: boolean,
	disabled?: boolean,
	loading?: boolean,
	badge?: string,
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
	loading,
	badge,
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
				[styles.red]: stylizedAs === 'red',
			},
				exportButton && styles.exportButton,
				createButton && styles.createButton,
				filterButton && styles.filterButton,
				disabled && styles.disabled,
				loading && styles.loading,
			)}>
			{children}
			{badge && !loading && <span className={styles.badge}>{badge}</span>}
		</Component>
	)
}
