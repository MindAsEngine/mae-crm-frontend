import * as React from "react";
import styles from "./login.module.scss";
import Input from "../../Components/FormComponents/Input/Input.tsx";
import {Button} from "../../Components/FormComponents/Button/Button.tsx";
import clsx from "clsx";
import {Navigate, useNavigate} from "react-router-dom";
import {isAuth, setAuth, setUser} from "./logout.ts";

const apiUrl = import.meta.env.VITE_API_URL;
export default function LoginPage(){
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);
    const [touched, setTouched] = React.useState(false);
    const [login, setLogin] = React.useState({
        login: "user",
        password: "password"
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (login.login === "" || login.password === "") {
            setError('Заполните все поля');
            setTouched(true);
            return;
        } else {
            fetchLogin();
        }
    }
    const fetchLogin = async () => {
        fetch(apiUrl+'/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Указывает, что тело запроса в формате JSON
            },
            body: JSON.stringify(login),
        }).then(res => {
            if (!res.ok) {
                throw new Error('Ошибка при входе');
            }
            return res.json();
        }).then((data) => {
            setUser(data.user);
            setAuth(data.access_token, data.refresh_token);
            navigate('/');
        }).catch((err) => {
            console.error(err);
            setError('Ошибка при входе');
        })
    }
    if (isAuth()){
        return <Navigate to={'/' } replace={true}/>
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
                            isValid={login.login !== ""}
                            isTouchedDefault={touched}
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
                        } value={login.password} className={styles.input}
                            placeholder="Введите ваш пароль" type="password"
                            isValid={login.password !== ""}
                            isTouchedDefault={touched}

                        />
                    </label>
                    {error && <div className={styles.error}>{error}</div>}
                    <Button
                        disabled={login.login === "" || login.password === ""}
                        className={styles.button} children={"Вход"} stylizedAs={'blue-dark'}/>
                </form>
            </div>
        </main>
    )
}