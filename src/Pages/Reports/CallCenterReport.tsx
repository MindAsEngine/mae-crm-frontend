import * as React from "react";
import Table from "../../Components/Table/Table.tsx";
import FilterBar from "../../Components/FilterPanel/FilterBar.tsx";
import {useState} from "react";
import dayjs from "dayjs";

export type FilterType = {
    search: string;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
}

export default function CallCenterReport() {
	const data = [
		{ id: "1", name: "John", age: "25" },
		{ id: "2", name: "Jane", age: "24" },
		{ id: "3", name: "Doe", age: "26" },
	];
	const header = { id: "ID", name: "Name", age: "Age" };
	const [filters, setFilters] = useState<FilterType>({
        search: "",
        startDate: dayjs().subtract(1, "month"),
        endDate: dayjs()
    })

	return (
		<main>
			<FilterBar setFilters={setFilters} filters={filters} />
			<Table data={data} header={header} />
		</main>
	)
}
