import * as React from 'react'
import dataJson from './users.json'
import {useEffect, useState} from "react";
import Report from '../../Components/Report/Report.tsx';
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import UserCreateOrUpdate from "../../Components/Forms/User/UserCreateOrUpate.tsx";




export default function UsersPage() {
	const [filters, setFilters] = useState({
		search: "", // Поиск по ФИО
	});
	const [dataUsers, setDataUsers] = useState([]);
	const [header, setHeader] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userInUpdate, setUserInUpdate] = useState(null);

	const [isCreateUserOpened, setIsCreateUserOpened] = useState(false);
	const [isUpdateUserOpened, setIsUpdateUserOpened] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const {search} = filters;
			const params = new URLSearchParams();
			if (search !== "") params.append("search", search);

			await fetch(`/api/users?${params.toString()}`, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
				}
			})
				.then((res) => {
					if (!res.ok) {
						setTimeout(() => {
						}, 1000); // Имитация задержки в 1 секунду
						return dataJson;
					}
					return res.json();
				})
				.then((data) => {
					setDataUsers(data.data);
					setHeader(data.headers);
					setLoading(false);
				})
				.catch((error) => {
					console.error('Ошибка:', error);
				});

		};
		fetchData();
	}, [filters])
	console.log("filterParams", filters)
	const onClickCell = (rowPos: string | number, columnPos: string, cellData: string) => {
		// console.log("rowPos", rowPos, dataUsers);
		setUserInUpdate(dataUsers.find((user) => user.id === rowPos));
		// console.log("User in update", userInUpdate);
		setIsUpdateUserOpened(true);

	}
	return (

		<Report data={dataUsers}
				header={header}
				filters={filters}
				setFilters={setFilters}
				noDataRange={true}
				isLoading={loading}
				onClickCell={onClickCell}
		>
			<div>

					<UserCreateOrUpdate onClose={
						() => {
							// setIsUpdateUserOpened(false);
							setUserInUpdate(null);
						}
					} isOpenCreateUser={isUpdateUserOpened}
										setIsOpenCreateUser={setIsUpdateUserOpened}
										userBeforeUpdate={userInUpdate}
										isUpdate={true}
					/>

				<UserCreateOrUpdate

					isOpenCreateUser={isCreateUserOpened} setIsOpenCreateUser={setIsCreateUserOpened}/>
				<Button
					stylizedAs={'blue-dark'}
					createButton={true}
					onClick={() => setIsCreateUserOpened(true)}>
					Создать пользователя
				</Button>

			</div>
		</Report>
	)
}
