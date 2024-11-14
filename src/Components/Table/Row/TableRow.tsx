import * as React from 'react';
import style from './tableRow.module.scss';
import { TableHeaderCell } from '../TableHeader/TableHeader.tsx';
import clsx from "clsx";
import StatusPlate from "../../StatusPlate/StatusPlate.tsx";
import {statusEnum} from "../../StatusPlate/data.ts";
import dayjs from "dayjs";

type TableRowProps = {
	row: { [key: string]: string | number };
	isChecked: boolean;
	setCheckedRows: (updateFunction: (prev: (string | number)[]) => (string | number)[]) => void;
	header: Array<TableHeaderCell>;
	onClickCell?: (rowPos: string | number, columnPos: string, cellData: string | number | boolean) => void
};
const prepareCell= (cellData, format)=> {
	switch (format) {
		case 'percent':
			return typeof cellData === "number" ?
				`${(cellData as number) * 100}%` : '';
		case 'enum':
			return <StatusPlate name={cellData} inEdit={false}/>
		case 'date':
			return dayjs(cellData).format('DD.MM.YYYY');
		default:
			return (cellData);
	}
};
export default function TableRow({ row, isChecked, setCheckedRows, header, onClickCell }: TableRowProps) {
	return (
		<tr className={style.tableRow}>
			{header.map((headerCell, index) => (
				(!headerCell.is_hidden_by_user || headerCell.is_id)  &&
				<td key={index} className={ clsx(style.tableCell, onClickCell && style.onClickCell)}
					onClick={()=> {
							onClickCell && (headerCell.format === 'number')
								? onClickCell(row['id'],headerCell.name, row[headerCell.name]) : {}
						}}>
					<span className={style.cellElement}>
					{/*	todo date format and create func for this*/}
					{headerCell.name !== 'id' ? (
						prepareCell(row[headerCell.name], headerCell.format )
					) : (
<>
						<input
							type="checkbox"
							className={style.checkbox}
							value={row['id'].toString()}
							checked={isChecked}
							onChange={() =>
								setCheckedRows((prev) =>
									isChecked
										? prev.filter((id) => id !== row['id'])
										: [...prev, row['id']]
								)
							}
						/>

					{headerCell.is_visible && row['id']}
</>

						)}
						</span>
				</td>
			))}
		</tr>
	);
}
