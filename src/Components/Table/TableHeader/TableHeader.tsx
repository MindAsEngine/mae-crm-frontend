import * as React from 'react';
import styles from './tableHeader.module.scss';
import HeaderCell, {TableHeaderCell} from "./HeaderCell/HeaderCell.tsx";

export type TableHeaderProps = {
	row: Array<TableHeaderCell>;
	isAllChecked?: boolean;
	// setAllChecked?: (isChecked: boolean) => void;
	isAllUnchecked?: boolean;
	handleAllChecked?: () => void;
	onClickHeaderCell?: (columnPos: string) => void;
};



export default function
	TableHeader({ row, isAllChecked=false, handleAllChecked, isAllUnchecked=true, onClickHeaderCell }: TableHeaderProps) {
	return (
		<tr className={styles.tableRow}>
			{Array.isArray(row) &&
				row.map((cellData, index) =>
					(cellData.is_hidden_by_user === false || cellData.is_visible) && (
						<HeaderCell
							key={cellData.name + index}
							cellData={cellData}
							isAllChecked={isAllChecked}
							handleAllChecked={handleAllChecked}
							isAllUnchecked={isAllUnchecked}
							onClickHeaderCell={() => onClickHeaderCell(cellData.name)}
						/>
					)
			)}
		</tr>
	);
}
