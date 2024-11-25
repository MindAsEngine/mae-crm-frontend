import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from "./regions.module.scss"
import {Button} from "../../../Components/FormComponents/Button/Button.tsx";
import Report from "../../../Components/Report/Report.tsx";
import {dataRegions, headerFromServerRegions} from "./dataRegions.ts";
import ModalCustom from "../../../Components/Forms/CustomModal/ModalCustom.tsx";
import RangeDate from "../../../Components/FormComponents/RangeDate/RangeDate.tsx";


export default function RegionsReport() {
	const [filters, setFilters] = useState({
		search: '',
		startDate: null,
		endDate: null,
	})

	const [chosenData, setChosenData] = useState([])
	console.log(chosenData)
	console.log(filters)

	const [header, setHeader] = useState(headerFromServerRegions);
	const [isOpen, setIsOpen] = useState(false)
	const [customSettings, setCustomSettings] = useState([]);


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
		const transformedHeader = headerFromServerRegions.map(cell => ({
			name: cell.name,
			is_id: cell.is_id,
			is_additional: cell.is_additional,
			title: cell.title,
			is_visible: cell.is_visible,
			format: cell.format,
			is_hidden_by_user: !cell.is_visible,
			is_aside_header: cell.is_aside_header
		}));

		setHeader(transformedHeader);
		// @ts-ignore
		setDefaultCustomSettings(transformedHeader);

	}, []);
	const handleStartDateChange = (date) => {
		setFilters((prevFilters) => {
			// console.log('Updated Filters (start date):', updatedFilters);
			return {
				...prevFilters,
				startDate: date,
			};
		});
	};

	const handleEndDateChange = (date) => {
		setFilters((prevFilters) => {
			// console.log('Updated Filters (end date):', updatedFilters);
			return {
				...prevFilters,
				endDate: date,
			};
		});
	};

	const onCustomSettingApplied = () => {
		setHeader(prevHeader =>
			prevHeader.map(cell => {
				const setting = customSettings.find(s => s.name === cell.name);
				return setting ? { ...cell, is_hidden_by_user: !setting.applied_visible,
					is_visible: setting.applied_visible
				} : cell;
			})
		);
	};


	const onCheckboxChanged = (name) => {
		// @ts-ignore
		setCustomSettings(prevSettings =>
			prevSettings.map(cell =>
				cell.name === name ? { ...cell, applied_visible: !cell.applied_visible } : cell
			)
		);
	};

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
				<ModalCustom
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					customSettings={customSettings}
					setCustomSettings={setCustomSettings}
					header={header}
					setDefaultCustomSettings={setDefaultCustomSettings}
					onCustomSettingApplied={onCustomSettingApplied}
					onCheckboxChanged={onCheckboxChanged}
					/>

				<RangeDate
					startDate={filters.startDate}
					endDate={filters.endDate}
					setStartDate={(date) => {
						handleStartDateChange(date)
						// console.log('Set start date IN FILTER BAR', date)
					}}
					setEndDate={(date) => {
						handleEndDateChange(date)
						// console.log('Set end date IN FILTER BAR', date)
					}}
				/>





				<Button
					stylizedAs={'blue-dark'}
					exportButton={'white'}
					onClick={() => console.log('export')}
				>
					Экспорт
				</Button>



			</div>
		</Report>


		</>
	)
}
