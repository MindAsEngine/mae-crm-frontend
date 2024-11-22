import * as React from 'react';
import style from './tableRow.module.scss';
import {TableHeaderCell} from "../TableHeader/HeaderCell/HeaderCell.tsx";
import Cell from "./Cell/Cell.tsx";
import clsx from "clsx";


type TableRowProps = {
	row: { [key: string]: string | number };
	isChecked?: boolean;
	setCheckedRows?: (updateFunction: (prev: (string | number)[]) => (string | number)[]) => void;
	header: Array<TableHeaderCell>;
	onClickCell?: (rowPos: string | number, columnPos: string, cellData: string | number | boolean) => void
};

export default function TableRow({ row, isChecked, setCheckedRows, header, onClickCell }: TableRowProps) {
	return (
		<tr className={clsx(style.tableRow, row['is_anomaly'] && style.anomaly,
			row['is_footer'] && style.footer,
			)}>
			{header.map((headerCell, index) => (
				  (headerCell.is_hidden_by_user === false || headerCell.is_visible )  &&
				  (
							  <Cell
								 isAsideHeader={headerCell.is_aside_header}
								 isFooter={row['is_footer']}
								  isArrayInRow={header.find(cell => cell.format === 'array')}
								  key={index}
								  onClickCell={onClickCell}
								  columnName={headerCell.name}
								  idData={row['id']}
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
