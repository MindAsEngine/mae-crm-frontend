import * as React from 'react'
import TableRow from './Row/TableRow.tsx'
import styles from './table.module.scss'
import TableHeader from './TableHeader/TableHeader.tsx'
import {useEffect} from "react";
import {TableHeaderCell} from "./HeaderCell/HeaderCell.tsx";
import TableFooter from "./TableFooter/TableFooter.tsx";
type TableProps = {
	data: Array<object>
	header: Array<TableHeaderCell>,
	checkedRows?: Array<number>,
	setCheckedRows?: (prev:Array<number>) => void,
	onClickCell?: (rowPos: string | number, columnPos: string, cellData: string) => void,
}
export default function Table({ data, header, onClickCell, checkedRows, setCheckedRows }: TableProps) {
	const [isAllChecked, setAllChecked] = React.useState<boolean>(false);
	const [isAllUnchecked, setAllUnchecked] = React.useState<boolean>(true);
	const handleCheckAll = () => {
		if (typeof setCheckedRows === 'function') {
			setAllChecked(prev => {
				if (!prev) {
					setCheckedRows(data.map((row) => row['id']))
				} else {
					setCheckedRows([])
				}
				return !prev;
			});
		}
	};
	useEffect(() => {
		setAllUnchecked(checkedRows?.length === 0);
		setAllChecked(checkedRows?.length === data.length);
	}, [checkedRows]);
	return (
		<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<thead className={styles.tableHead}>
					<TableHeader
						isAllUnchecked={isAllUnchecked}
						row={header}
						isAllChecked={isAllChecked}
						handleAllChecked={handleCheckAll}
					/>
				</thead>
				<tbody className={styles.tableBody}>
					{data.map((row, index) => (

						<TableRow
							onClickCell={onClickCell}
							key={index} row={row}  isChecked={checkedRows?.includes(row['id'])} setCheckedRows={setCheckedRows} header={header}/>
					))}
				</tbody>

				<tfoot>
				{data.map((row, index) => (

					<TableFooter
						onClickCell={onClickCell}
						key={index} row={row} header={header}/>
				))}
				</tfoot>
			</table>
		</div>
	)
}
