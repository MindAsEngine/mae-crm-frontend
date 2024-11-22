import * as React from 'react'
import styles from "./regions.module.scss"
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import {dataRegions, headerFromServerRegions} from "./dataRegions.ts";

import { useState} from "react";
import dayjs from "dayjs";
import Curtain from "../../../Components/Curtain/Curtain.tsx";
import {dataCallCenter, headerFromServerCallCenter} from "../CallCenter/dataCallCenter.ts";


export default function RegionsReport() {
	const [filters, setFilters] = useState({
		search: '',
		startDate: dayjs().subtract(1, 'month'),
		endDate: dayjs()
	})

	const [chosenData, setChosenData] = useState([])
	console.log(chosenData)
	console.log(filters)

	const [header, setHeader] = useState(headerFromServerRegions);
	console.log(header)
	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		console.log(rowPos, columnPos, cellData);
		// setIsOpenCurtain(true);
	}
	return (
		<>

		<Report data={dataRegions}
				header={header}
				chosenData={chosenData}
				setChosenData={setChosenData}
				filters={filters}
				setFilters={setFilters}

				onClickCell={onClickCell}
		>

			<div className={styles.custom}>



				<Button
					stylizedAs={'blue-dark'}
					exportButton={'white'}
					onClick={() => console.log('export')}
				>
					Экспорт
				</Button>



			</div>
			{/*<Curtain isCurtainOpen={isOpenCurtain} setIsCurtainOpen={setIsOpenCurtain}*/}
			{/*	children={*/}
			{/*	<Report data={dataCallCenter} header={headerFromServerCallCenter}*/}
			{/*					  noDataRange={true}*/}
			{/*					  children={*/}
			{/*		<Button stylizedAs={'blue-light'} exportButton={'blue'}>*/}
			{/*			Экспорт </Button>*/}

			{/*					  }*/}
			{/*					  filters={curtainFilters} setFilters={setCurtainFilters} />}*/}
			{/*/>*/}

		</Report>


		</>
	)
}
