import * as React from 'react'
import TableRow from './Row/TableRow.tsx'
import styles from './table.module.scss'
import TableHeader from './TableHeader/TableHeader.tsx'
import { useEffect, useRef, useState } from "react";
import { TableHeaderCell } from "./TableHeader/HeaderCell/HeaderCell.tsx";
import clsx from "clsx";
import {useLocation} from "react-router-dom";
import Loading from "../Loading/Loading.tsx";
import ErrorComponent from "../Error/ErrorComponent.tsx";
import {is} from "date-fns/locale";

type TableProps = {
	data: Array<object>
	header: Array<TableHeaderCell>
	checkedRows?: Array<number>
	setCheckedRows?: (prev: Array<number>) => void
	onClickCell?: (rowPos: string | number, columnPos: string, cellData: string) => void
	footer?: any
	isLoading?: boolean
	onHeaderClick?: (columnPos: string) => void
	onScrollEnd?: () => void

	isAllChecked?: boolean
	setAllChecked?: (prev: boolean) => void
}

export default function Table({
								  data,
								  header,
								  footer,
								  onClickCell,
								  checkedRows,
								  setCheckedRows,
								  isLoading,
	isAllChecked,
	setAllChecked,
	onScrollEnd,

	onHeaderClick
							  }: TableProps) {
	const url = useLocation();

	const [isAllCheckedLocal, setAllCheckedLocal] = useState<boolean>(false);
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
				return allChecked && Array.isArray(data)
					? data.map(row => row['id']) : []; // Select all or none
			});
		}
	};
	// console.log(data?.length);
	// useEffect(() => {
	// 	setAllUnchecked(Array.isArray(checkedRows) && checkedRows.length === 0);
	// 	setAllChecked(Array.isArray(checkedRows) && checkedRows.length === data.length);
	// }, [checkedRows, data?.length]);  // Depend on checkedRows and data.lengthff
	useEffect(() => {
		setAllUnchecked(checkedRows?.length === 0);
		if (typeof setAllChecked === 'function') {
			setAllChecked(data?.length > 0 && checkedRows?.length === data.length );
		} else {
			setAllCheckedLocal(data?.length > 0 && checkedRows?.length === data.length );
		}
	}, [checkedRows, data]);

	useEffect(() => {
		if (tableWrapperRef.current && tableHeadRef.current) {
			if (tableHeadRef.current.scrollWidth > tableWrapperRef.current.clientWidth) {
				setHasScrollHorizontal(true);
			}
		}
		if (tableWrapperRef.current && tableRef.current && tableBefore.current) {
			// console.log(tableRef.current.scrollHeight, tableWrapperRef.current.clientHeight);
			if (tableRef.current.scrollHeight > tableWrapperRef.current.clientHeight
			|| tableWrapperRef.current.clientHeight > document.body.clientHeight) {
				setHasScrollVertical(true);
				tableBefore.current.style.top = tableWrapperRef.current.offsetTop + "px";
			}

		}


	}, [data, header, url]); // Rerun when data changes
	// console.log(data);
	if (data === undefined || header === null || header === undefined || data?.length === 0) {
		// console.log("error");
		return (
			<Loading key={"table"}/>
		);
	}
	if (data === null) {
		return (
			<ErrorComponent key={"table"}
							title={"Данных с такими параметрами фильтрации не найдено"}/>
		);
	}
	return (
		<div className={clsx(styles.tableWrapper, hasScrollHorizontal && styles.hasHorizontalScroll,
			hasScrollVertical && styles.hasVerticalScroll
		)} ref={tableWrapperRef}
			 onScroll={event => {
				 if (tableWrapperRef.current) {

					 if (tableWrapperRef.current.scrollTop + tableWrapperRef.current.clientHeight >= tableWrapperRef.current.scrollHeight) {
						 if (typeof onScrollEnd === 'function') {
							 onScrollEnd();
						 }
					 }
				 }
			 }}
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
					isAllChecked={typeof setAllChecked === 'function' ? isAllChecked : isAllCheckedLocal}

					handleAllChecked={handleCheckAll}
					onClickHeaderCell={onHeaderClick}
				/>
				</thead>
				<tbody className={styles.tableBody}>
				{Array.isArray(data) &&
					data.filter(
					(row) => !row['is_footer']
				).map((row, index) => (
					<TableRow
						onClickCell={onClickCell}
						key={index} // Use unique key (row['id']) instead of index
						row={row}
						isChecked={checkedRows?.includes(row['id'])}
						setCheckedRows={setCheckedRows}
						header={header}
					/>
				))}
				{isLoading &&
				<tr>
					<td colSpan={header?.length || 1}
					><Loading/></td>
				</tr>}

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
