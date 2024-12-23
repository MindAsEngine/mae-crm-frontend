import * as React from 'react'
import TableRow from './Row/TableRow.tsx'
import styles from './table.module.scss'
import TableHeader from './TableHeader/TableHeader.tsx'
import { useEffect, useRef, useState } from "react";
import { TableHeaderCell } from "./TableHeader/HeaderCell/HeaderCell.tsx";
import clsx from "clsx";
import {useLocation} from "react-router-dom";
import Loading from "../Loading/Loading.tsx";

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
	const url = useLocation();

	const [isAllChecked, setAllChecked] = useState<boolean>(false);
	const [isAllUnchecked, setAllUnchecked] = useState<boolean>(true);
	const [hasScrollHorizontal, setHasScrollHorizontal] = useState<boolean>(false);
	const [hasScrollVertical, setHasScrollVertical] = useState<boolean>(false);

	const tableWrapperRef = useRef<HTMLDivElement>(null);
	const tableHeadRef = useRef<HTMLTableSectionElement>(null);
	const tableRef = useRef<HTMLTableElement>(null);
	const tableBefore = useRef(null);

	const handleCheckAll = () => {
		if (typeof setCheckedRows === 'function') {
			setCheckedRows(prev => {
				const allChecked = !prev.length;
				return allChecked ? data.map(row => row['id']) : []; // Select all or none
			});
		}
	};

	useEffect(() => {
		setAllUnchecked(Array.isArray(checkedRows) && checkedRows.length === 0);
		setAllChecked(Array.isArray(checkedRows) && checkedRows.length === data?.length);
	}, [checkedRows, data?.length]);  // Depend on checkedRows and data.lengthff

	useEffect(() => {
		if (tableWrapperRef.current && tableHeadRef.current) {
			if (tableHeadRef.current.scrollWidth > tableWrapperRef.current.clientWidth) {
				setHasScrollHorizontal(true);
			}
		}
		if (tableWrapperRef.current && tableRef.current && tableBefore.current) {
			console.log(tableRef.current.scrollHeight, tableWrapperRef.current.clientHeight);
			if (tableRef.current.scrollHeight > tableWrapperRef.current.clientHeight
			|| tableWrapperRef.current.clientHeight > document.body.clientHeight) {
				setHasScrollVertical(true);
				tableBefore.current.style.top = tableWrapperRef.current.offsetTop + "px";
			}
		}

	}, [data, header, url]); // Rerun when data changes

	if (isLoading) {
		return (
			<Loading/>
		);
	}
	return (
		<div className={clsx(styles.tableWrapper, hasScrollHorizontal && styles.hasHorizontalScroll,
			hasScrollVertical && styles.hasVerticalScroll
		)} ref={tableWrapperRef}
		>
			 <span
				className={clsx(hasScrollVertical && styles.before)}
				ref={tableBefore}
			></span>
			<table className={styles.table} ref={tableRef}
				   id={"table-top"}
			>
				<thead className={styles.tableHead} ref={tableHeadRef}>
				<TableHeader
					isAllUnchecked={isAllUnchecked}
					row={header}
					isAllChecked={isAllChecked}
					handleAllChecked={handleCheckAll}
				/>
				</thead>
				<tbody className={styles.tableBody}>
				{Array.isArray(data) &&
					data.filter(
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
