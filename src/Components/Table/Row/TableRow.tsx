import * as React from 'react';
import style from './tableRow.module.scss';
import {TableHeaderCell} from "../TableHeader/HeaderCell/HeaderCell.tsx";
import Cell from "./Cell/Cell.tsx";
import clsx from "clsx";


type TableRowProps = {
	isFooter?: boolean;
	row: { [key: string]: string | number };
	isChecked?: boolean;
	setCheckedRows?: (updateFunction: (prev: (string | number)[]) => (string | number)[]) => void;
	header: Array<TableHeaderCell>;
	onClickCell?: (rowPos: string | number, columnPos: string, cellData: string | number | boolean) => void
};

export default function TableRow({ row,isFooter=false, isChecked, setCheckedRows, header, onClickCell }: TableRowProps) {
	console.log(header);
	return (
		<tr className={clsx(style.tableRow, row?.is_anomaly && style.anomaly,
			isFooter && style.footer,
			)}>
			{Array.isArray(header) &&
				header.map((headerCell, index) => (

				  (headerCell.is_hidden_by_user === false || headerCell.is_visible )  &&
				  (
							  <Cell
								 isAsideHeader={headerCell.is_aside_header}
								 isFooter={isFooter}
								  isArrayInRow={header.find(cell => cell.format === 'array')}
								  key={index}
								  onClickCell={onClickCell}
								  columnName={headerCell.name}
								  idData={row['id'] as number}
								 rowName={row[header[0].name] as string}
								  cellData={row[headerCell.name]}
								  columnFormat={headerCell.format}
								  isChecked={isChecked}
								  setCheckedRows={setCheckedRows}
							  />
				  )
			))}
		</tr>
	);
}
