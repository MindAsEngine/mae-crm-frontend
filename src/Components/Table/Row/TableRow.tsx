import * as React from 'react';
import style from './tableRow.module.scss';
import { TableHeaderCell } from '../TableHeader/TableHeader.tsx';
import clsx from "clsx";
import StatusPlate from "../../StatusPlate/StatusPlate.tsx";
import dayjs from "dayjs";
import Checkbox from "../../FormComponents/Checkbox/Checkbox.tsx";

type TableRowProps = {
	row: { [key: string]: string | number };
	isChecked?: boolean;
	setCheckedRows?: (updateFunction: (prev: (string | number)[]) => (string | number)[]) => void;
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
				(headerCell.is_hidden_by_user === false || headerCell.is_visible)  &&
				<td key={index} className={ clsx(style.tableCell, onClickCell && style.onClickCell)}
					onClick={()=> {
							onClickCell && (headerCell.format === 'number')
								? onClickCell(row['id'],headerCell.name, row[headerCell.name]) : {}
						}}>
					<div className={clsx(style.cellElement, headerCell.format === 'array' && style.array)}>

					{headerCell.name !== 'id' ? (
						<>
							{headerCell.format !== 'array' ?
								(prepareCell(row[headerCell.name], headerCell.format ))
								: (row[headerCell.name].map((one, index) => (
									<span key={index} className={style.arrayElement}>
										{(prepareCell(one, 'string' )) }
									</span>
								)))
							}
						</>

						) :
						(
							<>

								<Checkbox
									checked={isChecked}
									onChange={() =>
										setCheckedRows &&
										setCheckedRows((prev) =>(
											isChecked
												? prev.filter((id) => id !== row['id'])
												: [...prev, row['id']]
										))}
									/>
								{row[headerCell.name]}
							</>
						)
					}
						</div>
				</td>
			))}
		</tr>
	);
}
