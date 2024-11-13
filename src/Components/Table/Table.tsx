import * as React from 'react'
import TableRow from './Row/TableRow.tsx'
import styles from './table.module.scss'
import TableHeader, {TableHeaderCell} from './TableHeader/TableHeader.tsx'
import {useEffect} from "react";

type TableProps = {
	data: Array<object>
	header: Array<TableHeaderCell>,
	checkedRows: Array<number>,
	setCheckedRows: (prev:Array<number>) => void
}
export default function Table({ data, header, checkedRows, setCheckedRows }: TableProps) {
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
						<TableRow key={index} row={row}  isChecked={checkedRows.includes(row['id'])} setCheckedRows={setCheckedRows} header={header}/>
					))}
				</tbody>
			</table>
		</div>
	)
}
