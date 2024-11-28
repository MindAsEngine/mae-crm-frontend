import * as React from 'react'
import TableRow from './Row/TableRow.tsx'
import styles from './table.module.scss'
import TableHeader from './TableHeader/TableHeader.tsx'
import {useEffect} from "react";
import {TableHeaderCell} from "./TableHeader/HeaderCell/HeaderCell.tsx";
import clsx from "clsx";
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
	const [hasScroll, setHasScroll] = React.useState<boolean>(false);
	const [width, setWidth] = React.useState<number>(0);
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
	useEffect(() => {
		setWidth(document.getElementById("table-wrapper").scrollWidth);
		console.log(document.getElementById("table-head").scrollWidth, document.getElementById("table-wrapper").clientWidth);
		if (document.getElementById("table-head").scrollWidth > document.getElementById("table-wrapper").clientWidth) {
			setHasScroll(true);
		}
	}, [document.getElementById("table-wrapper")?.clientWidth]);
	useEffect(() => {
		handleCheckAll();
	},[]);
	return (

		<div className={clsx(styles.tableWrapper , hasScroll && styles.hasHorizontalScroll)} id={"table-wrapper"}>
			<table className={styles.table} >

				<thead className={styles.tableHead} id={"table-head"}>
				<TableHeader
					isAllUnchecked={isAllUnchecked}
					row={header}
					isAllChecked={isAllChecked}
					handleAllChecked={handleCheckAll}
				/>
				</thead>
				<tbody className={styles.tableBody}>
				{data.filter(
					(row) => !row['is_footer'])
					.map((row, index) => (
						<TableRow
							onClickCell={onClickCell}
							key={index} row={row} isChecked={checkedRows?.includes(row['id'])}
							setCheckedRows={setCheckedRows} header={header}/>
					))}
				</tbody>
				<tfoot className={styles.tableFoot}>
				{data.filter(
					(row) => row['is_footer'])
					.map((row, index) => (
						<TableRow
							onClickCell={onClickCell}
							key={index} row={row} isChecked={checkedRows?.includes(row['id'])}
							setCheckedRows={setCheckedRows} header={header}/>
					))}
				</tfoot>
			</table>
		</div>
	)
}
