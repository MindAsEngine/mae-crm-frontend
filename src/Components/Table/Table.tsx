import * as React from 'react'
import TableRow from './Row/TableRow.tsx'
import styles from './table.module.scss'
import TableHeader, {TableHeaderCell} from './TableHeader/TableHeader.tsx'
import {useEffect} from "react";
type TableProps = {
	data: Array<object>
	header: Array<TableHeaderCell>,
	checkedRows: Array<number>,
	setCheckedRows: (prev:Array<number>) => void,
	onClickCell?: (rowPos: string | number, columnPos: string, cellData: string) => void,
}
export default function Table({ data, header, onClickCell, checkedRows, setCheckedRows }: TableProps) {
	const [isAllChecked, setAllChecked] = React.useState<boolean>(false);
	useEffect(() => {
		if (isAllChecked) {
			setCheckedRows(data.map((row) => row['id']))
		} else {
			setCheckedRows([])
		}
	}, [isAllChecked])
	// console.log(checkedRows)
	return (
		<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<thead className={styles.tableHead}>
					<TableHeader row={header} isAllChecked={isAllChecked} setAllChecked={setAllChecked}/>
				</thead>
				<tbody className={styles.tableBody}>
					{data.map((row, index) => (
						<TableRow
							onClickCell={onClickCell}
							key={index} row={row}  isChecked={checkedRows.includes(row['id'])} setCheckedRows={setCheckedRows} header={header}/>
					))}
				</tbody>
				{/*TODO table footer*/}
				{/*<tfoot>*/}
				{/*	<TableFooter/>*/}
				{/*</tfoot>*/}
			</table>
		</div>
	)
}
