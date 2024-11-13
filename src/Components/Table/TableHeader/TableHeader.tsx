import * as React from 'react';
import styles from './tableHeader.module.scss';
import clsx from 'clsx';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type TableHeaderProps = {
	row: Array<TableHeaderCell>;
	isAllChecked: boolean;
	setAllChecked: (isChecked: boolean) => void;
};

export type TableHeaderCell = {
	name: string;
	title: string;
	is_visible: boolean;
	is_additional: boolean;
	is_id: boolean;
	format: string;
};

export default function
	TableHeader({ row, isAllChecked, setAllChecked }: TableHeaderProps) {
	const handleAllChecked = () => {
		setAllChecked(!isAllChecked);
	};

	return (
		<tr className={styles.tableRow}>
			{row.map((cellData, index) => (
				(cellData.is_visible || cellData.is_id)  &&
				<th
					key={index}
					className={clsx(
						styles.tableCell,
						!cellData.is_visible && styles.isInVisible,
						cellData.is_additional && styles.isAdditional,
						cellData.is_id && styles.isId
					)}
				>
					{!cellData.is_id ? (
						<span className={styles.cellElement}>
						{cellData.title}
						</span>
					) : (
						<div className={styles.cellElement}>

						<input type="checkbox" onChange={handleAllChecked} checked={isAllChecked} />
							{cellData.is_visible && cellData.title}
						</div>
					)}
				</th>
			))}
		</tr>
	);
}
