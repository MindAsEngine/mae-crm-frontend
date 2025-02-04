
export function logout(){
    localStorage.clear();
}
export function getAuth(){
    return localStorage.getItem('token');
}
export function getUser(){
    if (localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user') as string);
    } else {
        return null;
    }
}
export function setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
}
export function setAuth(token: string, refreshToken: string){
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
}
export function getRefreshToken(){
    return localStorage.getItem('refreshToken');
}
export function getAuthHeader(){
    return {
        Authorization: `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json' // Указывает, что тело запроса в формате JSON
    }
}

export function refreshToken(apiUrl: string){
    let status = false;
    fetch(apiUrl+'/auth/refresh', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({refresh_token: getRefreshToken()})
    }).then(res => {
        if (!res.ok) {
            throw new Error('Ошибка при обновлении токена');
        }
        return res.json();
    }).then((data) => {
        setAuth(data.access_token, data.refresh_token);
        status = true;
    }).catch((err) => {
        console.error(err);
        logout();
        }
    )
    return status;
}

export function removeAuth(){
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}
export function removeUser(){
    localStorage.removeItem('user');
}
export function isAuth(){
    // console.log(localStorage.getItem('token'), "isAuth");
    return !!localStorage.getItem('token');
}
export function isAdministrator(){
    let user = JSON.parse(localStorage.getItem('user') as string);
    // console.log(user);
    return user?.role === 'admin';
}
