import React from 'react';
import FilterBar from "../FilterPanel/FilterBar.tsx";
import Table from "../Table/Table.tsx";
import styles from './report.module.scss';
import {TableHeaderCell} from "../Table/TableHeader/TableHeader.tsx";

type ReportProps = {
    data: any[]
    chosenData: any[]
    setChosenData: (prev:any) => void
    header: Array<TableHeaderCell>
    children?: React.ReactNode
    filters: any,
    setFilters: (prev:any) => void,
    onClickCell?: (rowPos: string | number, columnPos: string, cellData: string) => void

}

export default function Report({data, onClickCell, header, children, filters, setFilters, chosenData, setChosenData}: ReportProps) {

	return (
		<main className={styles.report}>
			<FilterBar setFilters={setFilters}
                       filters={filters}
                       children={children}
            />
			<Table
                data={data}
                header={header}
                checkedRows={chosenData}
                setCheckedRows={setChosenData}
                onClickCell={onClickCell}
            />
		</main>

    )
}