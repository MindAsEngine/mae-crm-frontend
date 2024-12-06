import * as React from 'react'
import TableRow from './Row/TableRow.tsx'
import styles from './table.module.scss'
import TableHeader from './TableHeader/TableHeader.tsx'
import { useEffect, useRef, useState } from "react";
import { TableHeaderCell } from "./TableHeader/HeaderCell/HeaderCell.tsx";
import clsx from "clsx";

type TableProps = {
	data: Array<object>
	header: Array<TableHeaderCell>
	checkedRows?: Array<number>
	setCheckedRows?: (prev: Array<number>) => void
	onClickCell?: (rowPos: string | number, columnPos: string, cellData: string) => void
	footer?: any
	isLoading?: boolean
}

export default function Table({
								  data,
								  header,
								  footer,
								  onClickCell,
								  checkedRows,
								  setCheckedRows,
								  isLoading
							  }: TableProps) {
	const [isAllChecked, setAllChecked] = useState<boolean>(false);
	const [isAllUnchecked, setAllUnchecked] = useState<boolean>(true);
	const [hasScroll, setHasScroll] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(0);
	const tableWrapperRef = useRef<HTMLDivElement>(null);
	const tableHeadRef = useRef<HTMLTableSectionElement>(null);

	const handleCheckAll = () => {
		if (typeof setCheckedRows === 'function') {
			setCheckedRows(prev => {
				const allChecked = !prev.length;
				return allChecked ? data.map(row => row['id']) : []; // Select all or none
			});
		}
	};

	useEffect(() => {
		setAllUnchecked(checkedRows?.length === 0);
		setAllChecked(checkedRows?.length === data.length);
	}, [checkedRows, data.length]);  // Depend on checkedRows and data.length

	useEffect(() => {
		if (tableWrapperRef.current && tableHeadRef.current) {
			// console.log(tableWrapperRef.current.scrollWidth, tableWrapperRef.current.clientWidth )

			setWidth(tableWrapperRef.current.scrollWidth);
			if (tableHeadRef.current.scrollWidth > tableWrapperRef.current.clientWidth) {
				setHasScroll(true);
			}
		}

	}, [data, header]); // Rerun when data changes

	if (isLoading) {
		return (
			<div className={styles.tableWrapper}>
				<div className={styles.loading}>Loading...</div>
			</div>
		);
	}
	return (
		<div className={clsx(styles.tableWrapper, hasScroll && styles.hasHorizontalScroll)} ref={tableWrapperRef}>
			<table className={styles.table}>
				<thead className={styles.tableHead} ref={tableHeadRef}>
				<TableHeader
					isAllUnchecked={isAllUnchecked}
					row={header}
					isAllChecked={isAllChecked}
					handleAllChecked={handleCheckAll}
				/>
				</thead>
				<tbody className={styles.tableBody}>
				{data.filter(
					(row) => !row['is_footer']
				).map((row, index) => (
					<TableRow
						onClickCell={onClickCell}
						key={row['id']} // Use unique key (row['id']) instead of index
						row={row}
						isChecked={checkedRows?.includes(row['id'])}
						setCheckedRows={setCheckedRows}
						header={header}
					/>
				))}
				</tbody>
				{footer &&
				<tfoot className={styles.tableFoot}>

					<TableRow
						isFooter={true}
						onClickCell={onClickCell}
						// Use unique key (row['id']) instead of index
						row={footer}

						header={header}
					/>

				</tfoot>}
			</table>
		</div>
	);
}
