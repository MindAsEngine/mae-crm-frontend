import * as React from 'react';
import styles from './tableHeader.module.scss';
import HeaderCell, {TableHeaderCell} from "./HeaderCell/HeaderCell.tsx";

type TableHeaderProps = {
	row: Array<TableHeaderCell>;
	isAllChecked?: boolean;
	// setAllChecked?: (isChecked: boolean) => void;
	isAllUnchecked?: boolean;
	handleAllChecked?: () => void;
};



export default function
	TableHeader({ row, isAllChecked=false, handleAllChecked, isAllUnchecked=true }: TableHeaderProps) {
	return (
		<tr className={styles.tableRow}>
			{row.map((cellData, index) => (
				<>
				{(cellData.is_hidden_by_user=== false || cellData.is_visible)  && (
				<HeaderCell
					key={index}
					cellData={cellData}
					isAllChecked={isAllChecked}
					handleAllChecked={handleAllChecked}
					isAllUnchecked={isAllUnchecked}
					onClickHeaderCell={()=> console.log(cellData.name + " sort")}
				/>
					)}
				</>
			))}
		</tr>
	);
}
