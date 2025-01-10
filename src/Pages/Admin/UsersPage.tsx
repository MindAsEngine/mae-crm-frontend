import * as React from 'react'
import dataJson from './users.json'
import {useEffect, useState} from "react";
import Report from '../../Components/Report/Report.tsx';
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import UserCreateOrUpdate from "../../Components/Forms/User/UserCreateOrUpate.tsx";
import {getAuthHeader, isAdministrator, logout} from "../Login/logout.ts";
import {Navigate, useNavigate} from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;




export default function UsersPage() {
	const [filters, setFilters] = useState({
		search: "", // Поиск по ФИО
	});
	const [dataUsers, setDataUsers] = useState([]);
	const [header, setHeader] = useState([]);
	const [loading, setLoading] = useState(true);
	const [userInUpdate, setUserInUpdate] = useState(null);
	const navigate = useNavigate();
	// const [isCreateUserOpened, setIsCreateUserOpened] = useState(false);
	const [isUpdateUserOpened, setIsUpdateUserOpened] = useState(false);

	if (!isAdministrator()) {
		return <Navigate to={'/'} replace={true}/>
	}

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const {search} = filters;
			const params = new URLSearchParams();
			if (search !== "") params.append("search", search);

			await fetch(apiUrl + `/users?${params.toString()}`, {
				method: 'GET',
				headers: getAuthHeader(),
			})
				.then((res) => {
					if (!res.ok) {
						if (res.status === 401) {
							logout()
							navigate('/login');
						} else if (res.status === 403) {
							navigate('/');

						}
						throw new Error('Ошибка:', res.status);
					}
					return res.json();
				})
				.then((data) => {
					setDataUsers(data.data);
					setHeader(data.headers);
					setLoading(false);
				})
				.catch((error) => {
					// setTimeout(() => {
					// }, 1000); // Имитация задержки в 1 секунду
					// const data = dataJson;
					// setDataUsers(data.data);
					// setHeader(data.headers);
					// setLoading(false);
				});

		};
		fetchData();
		// const data = dataJson;
		// setDataUsers(data.data);
		// setHeader(data.headers);
		// setLoading(false);

	}, [filters])
	// console.log("filterParams", filters)
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
				{isUpdateUserOpened &&
					<UserCreateOrUpdate
						onClose={() => {
							setIsUpdateUserOpened(false);}
						}
					 isOpenCreateUser={isUpdateUserOpened}
										setIsOpenCreateUser={setIsUpdateUserOpened}
										userBeforeUpdate={userInUpdate}
										isUpdate={userInUpdate !== null}
					/>}

				{/*<UserCreateOrUpdate*/}

				{/*	isOpenCreateUser={isCreateUserOpened} setIsOpenCreateUser={setIsCreateUserOpened}/>*/}
				<Button
					stylizedAs={'blue-dark'}
					createButton={true}
					onClick={() => {
						// setIsCreateUserOpened(true);

						setIsUpdateUserOpened(true);
					}}>
					Создать пользователя
				</Button>

			</div>
		</Report>
	)
}
