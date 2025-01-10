import { useEffect, useState} from "react";
import React from "react";
import styles from "../form.module.scss";
import Input from "../../FormComponents/Input/Input.tsx";
import clsx from "clsx";
import Form from "../Form.tsx";
import {Button} from "../../FormComponents/Button/Button.tsx";
const apiUrl = import.meta.env.VITE_API_URL;
class User{
    id: number | null;
    surname: string ;
    name: string ;
    patronymic: string;
    login: string ;
    password: string ;
    // createdAt: Date ;
}

type UserCreateOrUpateProps = {
    isOpenCreateUser: boolean;
    setIsOpenCreateUser: any;
    userBeforeUpdate: User;
    onClose: any;
    isUpdate?: boolean;
}

const UserCreateOrUpdate = ({ isOpenCreateUser, setIsOpenCreateUser, onClose, userBeforeUpdate={} ,isUpdate=false}: UserCreateOrUpateProps, ref) => {
        const [password, setPassword] = useState<string>("");
        const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
        const [isTouched, setIsTouched] = useState(false);

        const [err, setErr] = useState<string | null>(null);
        const [isSubmitStatusSuccess, setIsSubmitStatusSuccess] = useState<boolean| null>(null);
        const resetForm = () => {
            setUser({
                id: 0,
                surname: "",
                name: "",
                patronymic: "",
                login: "",
                password: "",
                // createdAt: new Date(),
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
            // createdAt: userBeforeUpdate ? userBeforeUpdate.createdAt : new Date(),
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
                    // createdAt: userBeforeUpdate.createdAt,
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
                         Authorization: `Bearer ${localStorage.getItem('token')}`,
                     },
                    body: JSON.stringify({
                        surname: user.surname,
                        name: user.name,
                        patronymic: user.patronymic,
                        login: user.login,
                        password: user.password,

                    }),

                }).then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                }).then((data) => {
                    // console.log("Data:", data);
                    setIsSubmitStatusSuccess(true);
                }).catch((error) => {
                    // console.error('Ошибка:', error);
                    setErr("Ошибка при создании пользователя");
                    setIsSubmitStatusSuccess(false);
                    setIsFormSubmitted(false);
                });
             }

             const putUser = async () => {

                 const response = await fetch( apiUrl + '/users/' + user.id, {
                        method: 'PUT',
                     headers: {
                         Authorization: `Bearer ${localStorage.getItem('token')}`,
                     },
                        body: JSON.stringify({
                            surname: user.surname,
                            name: user.name,
                            patronymic: user.patronymic,
                            login: user.login,
                            password: user.password,
                        })
                    }).then((res) => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! status: ${res.status}`);
                        }
                        return res.json();
                    }).then((data) => {
                        // console.log("Data:", data);
                        setIsSubmitStatusSuccess(true);
                    }).catch((error) => {
                        setErr("Ошибка при обновлении данных пользователя");
                        setIsSubmitStatusSuccess(false);
                     setIsFormSubmitted(false);

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
            if (!user.surname || !user.name || !user.login || !user.password || !password) {
                setErr("Заполните все обязательные поля");
                setIsTouched(true);
                return;
            }
            if ( password !== user.password) {
                setErr("Пароли не совпадают");
                setIsTouched(true);
                return;
            }

            setErr('');

            setIsFormSubmitted(true);


            if (!isFormSubmitted && isSubmitStatusSuccess) {
                resetForm();
                // setIsOpenCreateUser(false); // Закрыть модалку после отправки
            }
        };
        const handleResetClick = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            resetForm();
            setIsOpenCreateUser(false);
        };


        return (
            <Form
                isOpen={isOpenCreateUser}
                isDropDown={false}
                setIsOpen={setIsOpenCreateUser}
                title={!isUpdate ? "Создать пользователя" : "Редактировать пользователя"}
                classNameContent={styles.form}
                onClose={onClose}
                errMessage={err}

                footer={<>
                    <Button stylizedAs="white" onClick={handleResetClick}>
                        Отменить
                    </Button>
                    <Button stylizedAs={"blue-dark"} onClick={handleSubmit}>
                        {!isUpdate ? "Создать" : "Применить"}
                    </Button>

                </>}
            >
                {/*{!userBeforeUpdate?.surname &&*/}
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>
                        Фамилия</span>
                    <Input className={styles.input} name="surname"
                           isTouchedDefault={isTouched}
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
                            isTouchedDefault={isTouched}
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
                            isTouchedDefault={isTouched}
                           name="login" value={user.login} onChange={handleChange}
                    placeholder={"Введите логин"}
                    />

                </label>
            {/*}*/}

                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Пароль</span>
                    <Input className={styles.input}
                           isValid={!isUpdate ? user.password?.length > 0 : true}
                            isTouchedDefault={isTouched}
                           name="password" value={user.password} onChange={handleChange}
                    placeholder={"Введите пароль"}
                           type={"password"}
                    />
                </label>
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Пароль еще раз</span>
                    <Input className={clsx(styles.input)}
                           isValid={password === user.password && password.length > 0}
                           value={password}
                           name={"password2"}

                            isTouchedDefault={isTouched}
                            type={"password"}
                           onChange= {(e) => setPassword(e.target.value)}
                           placeholder={"Повторите пароль"}
                    />
                </label>

            </Form>
        );
    }
export default UserCreateOrUpdate;