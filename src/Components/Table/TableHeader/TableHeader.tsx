import * as React from 'react';
import styles from './tableHeader.module.scss';
import clsx from 'clsx';
import Checkbox from "../../FormComponents/Checkbox/Checkbox.tsx";

type TableHeaderProps = {
	row: Array<TableHeaderCell>;
	isAllChecked?: boolean;
	// setAllChecked?: (isChecked: boolean) => void;
	isAllUnchecked?: boolean;
	handleAllChecked?: () => void;
};

export type TableHeaderCell = {
	name: string;
	title: string;
	is_visible: boolean;
	is_additional: boolean;
	is_id: boolean;
	format: string;
	is_hidden_by_user?: boolean;
};

export default function
	TableHeader({ row, isAllChecked=false, handleAllChecked, isAllUnchecked=true }: TableHeaderProps) {
	return (
		<tr className={styles.tableRow}>
			{row.map((cellData, index) => (
				<>
				{(cellData.is_hidden_by_user=== false || cellData.is_visible)  && (
				<th
					key={index}
					className={clsx(
						styles.tableCell,
						cellData.is_hidden_by_user && styles.isInVisible,
						cellData.is_additional && styles.isAdditional,
						cellData.is_id && styles.isId
					)}
				>
						<span className={styles.cellElement}>
							{cellData.is_id  && (
								<Checkbox onChange={handleAllChecked} checked={isAllChecked} allCheckbox={true}
										  isAllUnchecked={isAllUnchecked} isAllChecked={isAllChecked}
								/>)}
							{cellData.title}
						</span>
				</th>)}


				</>
			))}
		</tr>
	);
}
