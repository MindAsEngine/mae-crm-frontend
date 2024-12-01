import {forwardRef, useEffect, useState} from "react";
import Modal from "../../Modal/Modal.tsx";
import React from "react";
import styles from "../form.module.scss";
import Input from "../../FormComponents/Input/Input.tsx";
import clsx from "clsx";

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
            id: 0,
            surname: "",
            name: "",
            patronymic: "",
            login: "",
            password: "",
            createdAt: new Date(),
        });
        useEffect(() => {
            if (userBeforeUpdate) {
                setUser(userBeforeUpdate);
                // console.log("User before update:", userBeforeUpdate.id, user);
            }

        }, []);



        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if(user.login ===""){
                return;
            }

            if (userBeforeUpdate) {
                console.log("Update data:", user);
            } else {
                console.log("Create data:", user);
            }
            if (typeof onClose === "function") onClose();
            resetForm();
            setIsOpenCreateUser(false); // Закрыть модалку после отправки

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
            >
                {!userBeforeUpdate?.surname &&
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>
                        Фамилия</span>
                    <Input className={styles.input} name="surname"
                            isValid={user.surname?.length > 0}
                           value={user.surname} onChange={handleChange}
                           placeholder={"Введите фамилию"}
                    />
                </label>}
                {!userBeforeUpdate?.name &&

                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Имя</span>
                    <Input className={styles.input}
                           isValid={user.name?.length > 0}

                           name="name" value={user.name} onChange={handleChange}
                    placeholder={"Введите имя"}
                    />
                </label>
            }
                {!userBeforeUpdate?.patronymic &&

                <label className={styles.label}>
                    <span className={styles.span}>Отчество</span>
                    <Input className={styles.input}
                           name="patronymic" value={user.patronymic} onChange={handleChange}
                    placeholder={"Введите отчество"}
                    />
                </label>}
                {!userBeforeUpdate?.login &&
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Логин</span>
                    <Input className={styles.input}
                           isValid={user.login?.length > 0}

                           name="login" value={user.login} onChange={handleChange}
                    placeholder={"Введите логин"}
                    />

                </label>}

                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Пароль</span>
                    <Input className={styles.input}
                           isValid={user.password?.length > 0}

                           name="password" value={user.password} onChange={handleChange}
                    placeholder={"Введите пароль"}
                           type={"password"}
                    />
                </label>
                <label className={styles.label}>
                    <span className={clsx(styles.span, styles.required)}>Пароль еще раз</span>
                    <Input className={clsx(styles.input)}
                           isValid={password === user.password && password?.length > 0}
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