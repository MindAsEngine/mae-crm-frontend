import {forwardRef, useEffect, useState} from "react";
import Modal from "../../Modal/Modal.tsx";
import React from "react";
import styles from "../form.module.scss";
import Input from "../../FormComponents/Input/Input.tsx";
import clsx from "clsx";
const apiUrl = import.meta.env.VITE_API_URL;
class User{
    id: number | null;
    surname: string ;
    name: string ;
    patronymic: string;
    login: string ;
    password: string ;
    createdAt: Date ;
}

type UserCreateOrUpateProps = {
    isOpenCreateUser: boolean;
    setIsOpenCreateUser: any;
    userBeforeUpdate: User;
    onClose: () => void;
    isUpdate?: boolean;
}

const UserCreateOrUpdate = forwardRef<HTMLFormElement>(
    ({ isOpenCreateUser, setIsOpenCreateUser, userBeforeUpdate={} ,isUpdate=false, onClose}: UserCreateOrUpateProps, ref) => {
        const [password, setPassword] = useState<string>("");
        const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
        const [isSubmitStatusSuccess, setIsSubmitStatusSuccess] = useState<boolean| null>(null);
        const resetForm = () => {
            setUser({
                id: 0,
                surname: "",
                name: "",
                patronymic: "",
                login: "",
                password: "",
                createdAt: new Date(),
            });
            setPassword("");
        }
        const [user, setUser] = useState({
            id: userBeforeUpdate ? userBeforeUpdate.id : 0,
            surname: userBeforeUpdate ? userBeforeUpdate.surname : "",
            name: userBeforeUpdate ? userBeforeUpdate.name : "",
            patronymic: userBeforeUpdate ? userBeforeUpdate.patronymic : "",
            login: userBeforeUpdate ? userBeforeUpdate.login : "",
            password: userBeforeUpdate ? userBeforeUpdate.password : "",
            createdAt: userBeforeUpdate ? userBeforeUpdate.createdAt : new Date(),
        });
        useEffect(() => {
            if (isUpdate) {
                setUser({
                    ...user,
                    id: userBeforeUpdate.id,
                    surname: userBeforeUpdate.surname,
                    name: userBeforeUpdate.name,
                    patronymic: userBeforeUpdate.patronymic,
                    login: userBeforeUpdate.login,
                    password: userBeforeUpdate.password,
                    createdAt: userBeforeUpdate.createdAt,
                });
            } else {
                resetForm();
            }
        }, [isUpdate]);
        useEffect(() => {
             const postUser = async () => {
                const response = await fetch( apiUrl + '/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                }).then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                }).then((data) => {
                    console.log("Data:", data);
                    setIsSubmitStatusSuccess(true);
                }).catch((error) => {
                    console.error('Ошибка:', error);
                    setIsSubmitStatusSuccess(false);
                });
             }

             const putUser = async () => {
                 const response = await fetch( apiUrl + '/users/' + user.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    }).then((res) => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json();
                    }).then((data) => {
                        console.log("Data:", data);
                        setIsSubmitStatusSuccess(true);
                    }).catch((error) => {
                        console.error('Ошибка:', error);
                        setIsSubmitStatusSuccess(false);
                 });
             }
            if (isFormSubmitted && !isUpdate) {
                postUser();
            } else if (isFormSubmitted && isUpdate) {
                putUser();
            }

        }, [isFormSubmitted]);



        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setIsFormSubmitted(true);

            if (typeof onClose === "function") onClose();
            if (!isFormSubmitted && isSubmitStatusSuccess) {
                resetForm();
                setIsOpenCreateUser(false); // Закрыть модалку после отправки
            }
        };


        return (
            <Modal
                isOpen={isOpenCreateUser}
                isDropDown={false}
                setIsOpen={setIsOpenCreateUser}
                title={!isUpdate ? "Создать пользователя" : "Сменить пароль пользователя"}
                as="form"
                handleSubmit={handleSubmit} // Передача функции отправки
                onClickWhiteButton={() => setIsOpenCreateUser(false)}
                onClickDarkBlueButton={() => {
                    console.log("Form submitted!" + user.login + " " + user.password);
                }}
                classNameContent={styles.form}
                onClose={onClose}
            >
                {/*{!userBeforeUpdate?.surname &&*/}
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>
                        Фамилия</span>
                    <Input className={styles.input} name="surname"
                            isValid={user.surname?.length > 0}
                           value={user.surname} onChange={handleChange}
                           placeholder={"Введите фамилию"}
                    />
                </label>
            {/*}*/}
                {/*{!userBeforeUpdate?.name &&*/}

                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Имя</span>
                    <Input className={styles.input}
                           isValid={user.name?.length > 0}

                           name="name" value={user.name} onChange={handleChange}
                    placeholder={"Введите имя"}
                    />
                </label>
            {/*}*/}
                {/*{!userBeforeUpdate?.patronymic &&*/}

                <label className={styles.label}>
                    <span className={styles.span}>Отчество</span>
                    <Input className={styles.input}
                           name="patronymic" value={user.patronymic} onChange={handleChange}
                    placeholder={"Введите отчество"}
                    />
                </label>
            {/*}*/}
            {/*    {!userBeforeUpdate?.login &&*/}
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Логин</span>
                    <Input className={styles.input}
                           isValid={user.login?.length > 0}

                           name="login" value={user.login} onChange={handleChange}
                    placeholder={"Введите логин"}
                    />

                </label>
            {/*}*/}

                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Пароль</span>
                    <Input className={styles.input}
                           isValid={!isUpdate ? user.password?.length > 0 : true}

                           name="password" value={user.password} onChange={handleChange}
                    placeholder={"Введите пароль"}
                           type={"password"}
                    />
                </label>
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Пароль еще раз</span>
                    <Input className={clsx(styles.input)}
                           isValid={password === user.password}
                           value={password}
                           name={"password2"}


                            type={"password"}
                           onChange= {(e) => setPassword(e.target.value)}
                           placeholder={"Повторите пароль"}
                    />
                </label>

            </Modal>
        );
    }
);
export default UserCreateOrUpdate;