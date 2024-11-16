import * as React from 'react'

import styles from "./speed.module.scss"
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import {dataSpeed, headerFromServerSpeed} from "./dataSpeed.ts";

import { useState} from "react";
import dayjs from "dayjs";
import Curtain from "../../../Components/Curtain/Curtain.tsx";
import {dataTasks, headerFromServerTasks} from "../../TaskPage/dataTasks.ts";


export default function ProcessedRequestsSpeedReport(){
	const [filters, setFilters] = useState({
		search: '',
		startDate: dayjs().subtract(1, 'month'),
		endDate: dayjs()
	})
	const [curtainFilters, setCurtainFilters] = useState({
		search: '',
	})
	const [chosenData, setChosenData] = useState([])
	console.log(chosenData)
	console.log(filters)
	const [isOpenCurtain, setIsOpenCurtain] = useState(false);

	const [header, setHeader] = useState(headerFromServerSpeed);

	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		console.log(rowPos, columnPos, cellData);
		setIsOpenCurtain(true);
	}
	return (
		<>

			<Report data={dataSpeed}
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
				<Curtain isCurtainOpen={isOpenCurtain} setIsCurtainOpen={setIsOpenCurtain}
						 children={
							 <Report data={dataTasks} header={headerFromServerTasks}
									 noDataRange={true}
									 children={
										 <Button stylizedAs={'blue-light'} exportButton={'blue'}>
											 Экспорт </Button>

									 }
									 filters={curtainFilters} setFilters={setCurtainFilters} />}
				/>

			</Report>


		</>
	)
}

