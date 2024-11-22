import * as React from 'react'
import styles from "./users.module.scss"
import {dataUsers, headerFromServerRegions} from "./dataUsers.ts";

import { useState} from "react";
import dayjs from "dayjs";
import Report from '../../Components/Report/Report.tsx';
import {Button} from "../../Components/FormComponents/Button/Button.tsx";


export default function Users() {
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

		<Report data={dataUsers}
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
					createButton={true}
					onClick={() => console.log('export')}
				>
					Создать пользователя
				</Button>



			</div>
		</Report>


		</>
	)
}
