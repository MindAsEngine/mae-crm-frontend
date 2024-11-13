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
}

export const Button: FC<IButtonProps> = ({
	children,
	className,
	as: Component = 'button',
	stylizedAs,
	...props
}) => {
	return (
		<Component {...props} className={clsx(className, styles.button,
			{
				[styles.blueDark]: stylizedAs === 'blue-dark',
				[styles.blueLight]: stylizedAs === 'blue-light',
				[styles.white]: stylizedAs === 'white',
			})}>
			{children}
		</Component>
	)
}
