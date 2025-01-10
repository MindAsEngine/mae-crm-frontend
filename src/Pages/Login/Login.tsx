import * as React from "react";
import styles from "./login.module.scss";
import Input from "../../Components/FormComponents/Input/Input.tsx";
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";
import {setAuth, setUser} from "./logout.ts";

export default function LoginPage(){
    const navigate = useNavigate();
    const [login, setLogin] = React.useState({
        login: "",
        password: ""
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // todo send request to server
        let user = {
            name: "name",
            surname: "surname",
            role: "admin"
        }
        setUser(user);
        setAuth('token');
        navigate('/');
    }

    return (
        <main className={styles.page}>

            <div className={styles.window}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Вход</h1>
                    <div className={styles.text}>
                        Добро пожаловать обратно!
                    </div>
                    <div className={styles.text}>
                        Введите свои учетные данные.
                    </div>

                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        <span className={styles.text}>Логин</span>
                        <Input
                            before={
                            <span className={clsx(styles.icon, styles.user)}/>
                            }
                            onChange={
                            (e) => setLogin({...login, login: e.target.value})
                        } value={login.login} className={styles.input} placeholder="Введите ваш логин" type="text"/>
                    </label>
                    <label className={styles.label}>
                        <span className={styles.text}>Пароль</span>
                        <Input
                            before={
                                <span className={clsx(styles.icon, styles.lock)}/>
                            }
                            onChange={
                            (e) => setLogin({...login, password: e.target.value})
                        } value={login.password} className={styles.input} placeholder="Введите ваш пароль" type="password"/>
                    </label>
                    <Button className={styles.button} children={"Вход"} stylizedAs={'blue-dark'}/>
                </form>
            </div>
        </main>
    )
}