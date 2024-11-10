import { IClassNameProps } from '@bem-react/core'
import React, { FC } from 'react'
import { cn } from '@bem-react/classname'

export interface IButtonProps extends IClassNameProps {
	as?: React.ElementType
	children: React.ReactNode
	onClick?: () => void
}

export const Button: FC<IButtonProps> = ({
	children,
	className,
	as: Component = 'button',
	...props
}) => {
	const cnButton = cn('Button')
	return (
		<Component {...props} className={cnButton({}, [className])}>
			{children}
		</Component>
	)
}
