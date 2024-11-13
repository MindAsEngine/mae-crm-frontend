import * as React from 'react';
import style from './tableRow.module.scss';
import { TableHeaderCell } from '../TableHeader/TableHeader.tsx';

type TableRowProps = {
	row: { [key: string]: string | number };
	isChecked: boolean;
	setCheckedRows: (updateFunction: (prev: (string | number)[]) => (string | number)[]) => void;
	header: Array<TableHeaderCell>;
};

export default function TableRow({ row, isChecked, setCheckedRows, header }: TableRowProps) {
	return (
		<tr className={style.tableRow}>
			{header.map((headerCell, index) => (
				(headerCell.is_visible || headerCell.is_id)  &&
				<td key={index} className={style.tableCell}>
					{headerCell.name !== 'id' ? (
						headerCell.format === 'percent' ? (
							`${(row[headerCell.name] as number) * 100}%`
						) : (
							row[headerCell.name]
						)
					) : (
						<div>
							{headerCell.is_visible && row['id']}
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
						</div>
					)}
				</td>
			))}
		</tr>
	);
}
