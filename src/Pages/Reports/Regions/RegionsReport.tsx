import * as React from 'react'
import styles from "./regions.module.scss"
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import {data, headerFromServer} from "./data.ts";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {TableHeaderCell} from "../../../Components/Table/TableHeader/TableHeader.tsx";


export default function RegionsReport() {
	const [filters, setFilters] = useState({
		search: '',
		startDate: dayjs().subtract(1, 'month'),
		endDate: dayjs()
	})
	const [chosenData, setChosenData] = useState([])
	console.log(chosenData)
	console.log(filters)
	const [isOpenCurtain, setIsOpenCurtain] = useState(false)
	const [header, setHeader] = useState(headerFromServer);

	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		console.log(rowPos, columnPos, cellData);
	}
	return (

		<Report data={data}
				header={header}
				chosenData={chosenData}
				setChosenData={setChosenData}
				filters={filters}
				setFilters={setFilters}

				onClickCell={onClickCell}
		>{/*todo onClick with open curtain*/}
			<div className={styles.custom}>

				<Button
					stylizedAs={'blue-dark'}
					exportButton={'white'}
					onClick={() => console.log('export')}
				>
					Экспорт
				</Button>

			</div>
		</Report>
	)
}
