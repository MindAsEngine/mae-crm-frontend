import * as React from 'react';
import style from './tableFooter.module.scss';
import {TableHeaderCell} from "../HeaderCell/HeaderCell.tsx";
import Cell from "../Cell/Cell.tsx";
import clsx from "clsx";


type TableRowProps = {
	row: { [key: string]: string | number };
	isChecked?: boolean;
	setCheckedRows?: (updateFunction: (prev: (string | number)[]) => (string | number)[]) => void;
	header: Array<TableHeaderCell>;
	onClickCell?: (rowPos: string | number, columnPos: string, cellData: string | number | boolean) => void
};

export default function TableFooter({ row, isChecked, setCheckedRows, header, onClickCell }: TableRowProps) {
	return (
		<tr className={style.tableRow}>
			{header.map((headerCell, index) => (
				  (headerCell.is_hidden_by_user === false || headerCell.is_visible )  &&
				  (
					  <>
						  {row['is_footer'] &&
							  <Cell
								  className={clsx(headerCell.is_aside_header && style.asideHeader,
									 row['is_anomaly'] && style.anomaly,
									 row['is_footer'] && style.footer,

								  )}
								  key={index}
								  onClickCell={onClickCell}
								  columnName={headerCell.name}
								  idData={row['id']}
								  cellData={row[headerCell.name]}
								  columnFormat={headerCell.format}
								  isChecked={isChecked}
								  setCheckedRows={setCheckedRows}
							  />
						  }


					  </>
				  )
			))}
		</tr>
	);
}
