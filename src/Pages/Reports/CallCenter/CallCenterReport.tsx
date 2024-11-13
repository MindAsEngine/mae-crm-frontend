import * as React from 'react'
import styles from './call-center.module.scss'
import { useState } from 'react'
import dayjs from 'dayjs'
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import Modal from "../../../Components/Modal/Modal.tsx";


export default function CallCenterReport() {
	const [filters, setFilters] = useState({
		search: '',
		startDate: dayjs().subtract(1, 'month'),
		endDate: dayjs()
	})
	const [chosenData, setChosenData] = useState([])
	console.log(chosenData)
	console.log(filters)
    const [isOpen, setIsOpen] = useState(false)

	const header = [
		{name: "id",is_id:true, title: "№", is_visible: true, is_additional: false, format: 'number'},
		{name: "fio",is_id:false, title: "ФИО", is_visible: true, is_additional: false, format: 'string'},
		{name: "count1",is_id:false, title: "Общее количество обращений", is_visible: true, is_additional: false, format: 'number'},
		{name: "count2",is_id:false, title: "Общее количество целевых обращений", is_visible: true, is_additional: false, format: 'number'},
		{name: "CR1",is_id:false, title: "Конверсия в целевое обращение", is_visible: true, is_additional: false, format: 'percent'},
		{name: "count3",is_id:false, title: "Количество назначенных визитов", is_visible: true, is_additional: false, format: 'number'},
		{name: "CR2",is_id:false, title: "Конверсия из целевых в назначенный визит", is_visible: true, is_additional: false, format: 'percent'},
		{name: "count4",is_id:false, title: "Количество состоявшихся визитов", is_visible: true, is_additional: false, format: 'number'},
		{name: "CR3",is_id:false, title: "Конверсия из назначенных визитов в состоявшийся", is_visible: true, is_additional: false, format: 'percent'},
		{name: "CR4",is_id:false, title: "Конверсия из целевого лида в состоявшийся визит", is_visible: true, is_additional: false, format: 'percent'},
		{name: "count5",is_id:false, title: "Кол-во платных бронирований", is_visible: false, is_additional: true, format: 'number'},
		{name: "CR5",is_id:false, title: "Конверсия из состоявшегося визита в платное бронирование", is_visible: false, is_additional: true, format: 'percent'},
		{name: "count6",is_id:false, title: "Кол-во заключенных договоров ДДУ", is_visible: false, is_additional: true, format: 'number'},
		{name: "CR6",is_id:false, title: "Конверсия из платного бронирования в ДДУ", is_visible: false, is_additional: true, format: 'percent'},
		{name: "CR7",is_id:false, title: "Конверсия из целевого обращения в ДДУ", is_visible: false, is_additional: true, format: 'percent'},
	]
	const data = [
		{id: 1, count1: 10, fio: "Иванов Иван Иванович",  count2: 5, CR1: 0.5, count3: 3, CR2: 0.6, count4: 2, CR3: 0.7, CR4: 0.8, count5: 1, CR5: 0.9, count6: 1, CR6: 1, CR7: 1},
		{id: 2, fio: "Петров Петр Петрович", count1: 20, count2: 10, CR1: 0.5, count3: 6, CR2: 0.6, count4: 4, CR3: 0.7, CR4: 0.8, count5: 2, CR5: 0.9, count6: 2, CR6: 1, CR7: 1},
		{id: 3, fio: "Сидоров Сидор Сидорович", count1: 30, count2: 15, CR1: 0.5, count3: 9, CR2: 0.6, count4: 6, CR3: 0.7, CR4: 0.8, count5: 3, CR5: 0.9, count6: 3, CR6: 1, CR7: 1},
		{id: 4, fio: "Николаев Николай Николаевич", count1: 40, count2: 20, CR1: 0.5, count3: 12, CR2: 0.6, count4: 8, CR3: 0.7, CR4: 0.8, count5: 4, CR5: 0.9, count6: 4, CR6: 1, CR7: 1},
		{id: 5, fio: "Александров Александр Александрович", count1: 50, count2: 25, CR1: 0.5, count3: 15, CR2: 0.6, count4: 10, CR3: 0.7, CR4: 0.8, count5: 5, CR5: 0.9, count6: 5, CR6: 1, CR7: 1},
		{id: 6, fio: "Андреев Андрей Андреевич", count1: 60, count2: 30, CR1: 0.5, count3: 18, CR2: 0.6, count4: 12, CR3: 0.7, CR4: 0.8, count5: 6, CR5: 0.9, count6: 6, CR6: 1, CR7: 1},
		{id: 7, fio: "Антонов Антон Антонович", count1: 70, count2: 35, CR1: 0.5, count3: 21, CR2: 0.6, count4: 14, CR3: 0.7, CR4: 0.8, count5: 7, CR5: 0.9, count6: 7, CR6: 1, CR7: 1},
		{id: 8, fio: "Артемов Артем Артемович", count1: 80, count2: 40, CR1: 0.5, count3: 24, CR2: 0.6, count4: 16, CR3: 0.7, CR4: 0.8, count5: 8, CR5: 0.9, count6: 8, CR6: 1, CR7: 1},
		{id: 9, fio: "Артемьев Артемий Артемьевич", count1: 90, count2: 45, CR1: 0.5, count3: 27, CR2: 0.6, count4: 18, CR3: 0.7, CR4: 0.8, count5: 9, CR5: 0.9, count6: 9, CR6: 1, CR7: 1},
		{id: 10, fio: "Артур Артур Артурович", count1: 100, count2: 50, CR1: 0.5, count3: 30, CR2: 0.6, count4: 20, CR3: 0.7, CR4: 0.8, count5: 10, CR5: 0.9, count6: 10, CR6: 1, CR7: 1},
		{id: 11, fio: "Архип Архип Архипович", count1: 110, count2: 55, CR1: 0.5, count3: 33, CR2: 0.6, count4: 22, CR3: 0.7, CR4: 0.8, count5: 11, CR5: 0.9, count6: 11, CR6: 1, CR7: 1},
		{id: 12, fio: "Арсен Арсен Арсенович", count1: 120, count2: 60, CR1: 0.5, count3: 36, CR2: 0.6, count4: 24, CR3: 0.7, CR4: 0.8, count5: 12, CR5: 0.9, count6: 12, CR6: 1, CR7: 1},
		{id: 13, fio: "Арсений Арсений Арсенович", count1: 130, count2: 65, CR1: 0.5, count3: 39, CR2: 0.6, count4: 26, CR3: 0.7, CR4: 0.8, count5: 13, CR5: 0.9, count6: 13, CR6: 1, CR7: 1},
		{id: 14, fio: "Артём Артём Артёмович", count1: 140, count2: 70, CR1: 0.5, count3: 42, CR2: 0.6, count4: 28, CR3: 0.7, CR4: 0.8, count5: 14, CR5: 0.9, count6: 14, CR6: 1, CR7: 1},
		{id: 15, fio: "Артемий Артемий Артемиевич", count1: 150, count2: 75, CR1: 0.5, count3: 45, CR2: 0.6, count4: 30, CR3: 0.7, CR4: 0.8, count5: 15, CR5: 0.9, count6: 15, CR6: 1, CR7: 1},
		{id: 16, fio: "Артемий Артемий Артемович", count1: 160, count2: 80, CR1: 0.5, count3: 48, CR2: 0.6, count4: 32, CR3: 0.7, CR4: 0.8, count5: 16, CR5: 0.9, count6: 16, CR6: 1, CR7: 1},
		]
	return(
		<Report data={data}
				header={header}
				chosenData={chosenData}
				setChosenData={setChosenData}
				filters={filters}
				setFilters={setFilters}
		>
			<div className={styles.custom}>
				<Button
					stylizedAs={'white'}
					className={styles.additional}
					onClick={() => setIsOpen(true)}
				>
					Custom
				</Button>
				<Button
					stylizedAs={'blue-dark'}
					className={styles.export}
					onClick={() => console.log('export')}>
					Экспорт
				</Button>
				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					<div>HELLO</div>
				</Modal>
			</div>
		</Report>
	);
}
