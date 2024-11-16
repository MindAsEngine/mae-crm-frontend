import * as React from 'react'
import styles from './call-center.module.scss'
import {useEffect, useState} from 'react'
import dayjs from 'dayjs'
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import Modal from "../../../Components/Modal/Modal.tsx";
import {TableHeaderCell} from "../../../Components/Table/TableHeader/TableHeader.tsx";
import {dataCallCenter, headerFromServerCallCenter} from "./dataCallCenter.ts";
import Checkbox from "../../../Components/FormComponents/Checkbox/Checkbox.tsx";


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
	const [customSettings, setCustomSettings] = useState([]);


	const [header, setHeader] = useState(Array<TableHeaderCell>)
	const setDefaultCustomSettings = (header) => {
		setCustomSettings(header.filter(cell => cell.is_additional)
		.map(cell => (
			{
				name: cell.name,
				title: cell.title,
				applied_visible: cell.is_visible
				// applied_visible: !cell.is_hidden_by_user if is to prev custom set(before apply)
			}))
		);
		}
	useEffect(() => {
		const transformedHeader = headerFromServerCallCenter.map(cell => ({
			name: cell.name,
			is_id: cell.is_id,
			is_additional: cell.is_additional,
			title: cell.title,
			is_visible: cell.is_visible,
			format: cell.format,
			is_hidden_by_user: !cell.is_visible
		}));

		setHeader(transformedHeader);
		// @ts-ignore
		setDefaultCustomSettings(transformedHeader);

	}, []);

	const onCustomSettingApplied = () => {
		setHeader(prevHeader =>
			prevHeader.map(cell => {
				const setting = customSettings.find(s => s.name === cell.name);
				return setting ? { ...cell, is_hidden_by_user: !setting.applied_visible } : cell;
			})
		);
		setIsOpen(false); // Close the modal after applying
	};

	const onCheckboxChanged = (name) => {
		// @ts-ignore
		setCustomSettings(prevSettings =>
			prevSettings.map(cell =>
				cell.name === name ? { ...cell, applied_visible: !cell.applied_visible } : cell
			)
		);
	};

	return (
		<Report data={dataCallCenter}
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
				>Custom
					<Modal isOpen={isOpen}
						   setIsOpen={setIsOpen}
						   title={"Кастом"}
						   onClickWhiteButton={setDefaultCustomSettings}
						   argWhiteButton={header}
						   onClickDarkBlueButton={onCustomSettingApplied}
						   classNameModal={styles.modal}
						   classNameContent={styles.modalContent}
						   classNameWindow={styles.modalWindow}
						   isDropDown={true}
					>
						{customSettings.map((item, index) => (
							<div key={index} className={styles.label}
								 onClick={() => {onCheckboxChanged(item.name)}}
							>
								{item.title}
								<Checkbox
									checked={item.applied_visible}
									onChange={() => onCheckboxChanged(item.name)}

								/>
							</div>
						))}


					</Modal>
				</Button>
				<Button
					stylizedAs={'blue-dark'}
					exportButton={'white'}
					onClick={() => console.log('export')}
				>
					Экспорт
				</Button>



			</div>
		</Report>
	);
}