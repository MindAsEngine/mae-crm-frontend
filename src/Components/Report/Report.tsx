import React, {useState} from 'react';
import FilterBar from "../FilterPanel/FilterBar.tsx";
import Table from "../Table/Table.tsx";
import styles from './report.module.scss';
import {TableHeaderCell} from "../Table/TableHeader/TableHeader.tsx";

type ReportProps = {
    data: any[]
    chosenData?: any[]
    setChosenData?: (prev:any) => void
    header: Array<TableHeaderCell>
    children?: React.ReactNode
    filters?: any,
    setFilters: (prev:any) => void,
    onClickCell?: (rowPos: string | number, columnPos: string, cellData: string) => void,
    noDataRange?: boolean,
    footer?: any
    isLoading?: boolean
    onHeaderClick?: (columnPos: string) => void
    onScrollEnd?: (e: any) => void

    isAllChecked?: boolean
    setAllChecked?: (prev: boolean) => void

}

export default function Report({data, isLoading,
                                    onHeaderClick,
    isAllChecked,
    setAllChecked,
    onScrollEnd,
                                   footer,noDataRange, onClickCell, header, children, filters, setFilters, chosenData, setChosenData}: ReportProps) {

	return (
		<main className={styles.report}>



			<FilterBar setFilters={setFilters}
                       filters={filters}
                       children={children}
                       noDataRange={noDataRange}
            />

			<Table
                isLoading={isLoading}
                data={data}
                header={header}
                footer={footer}
                checkedRows={chosenData}
                setCheckedRows={setChosenData}
                onClickCell={onClickCell}
                onHeaderClick={onHeaderClick}
                onScrollEnd={onScrollEnd}
                isAllChecked={isAllChecked}
                setAllChecked={setAllChecked}
            />

		</main>

    )
}