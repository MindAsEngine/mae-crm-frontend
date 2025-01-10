export function logout(){
    localStorage.clear();
}
export function getAuth(){
    return localStorage.getItem('token');
}
export function getUser(){
    return localStorage.getItem('user');
}
export function setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
}
export function setAuth(token: string){
    localStorage.setItem('token', token);
}
export function removeAuth(){
    localStorage.removeItem('token');
}
export function removeUser(){
    localStorage.removeItem('user');
}
export function isAuth(){
    return !!localStorage.getItem('token');
}
export function isAdministrator(){
    let user = JSON.parse(localStorage.getItem('user') as string);
    return user.role === 'admin';
}
