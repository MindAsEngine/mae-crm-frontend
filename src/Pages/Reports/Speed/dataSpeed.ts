
export const headerFromServerSpeed = [
    {name: "id",is_id:true, title: "№", is_visible: false, is_additional: false, format: 'number'},
    {name:"status_name",title: "Наименование статуса", is_id: false, format: 'string', is_visible: true, is_additional: false},
    {name: "no_purpose", title: "Не целевое", is_id: false, format: 'number', is_visible: true, is_additional: false},
    {name: "rejected", title: "Отказ", is_id: false, format: 'number', is_visible: true, is_additional: false},
    {name: "deferred", title: "Отложено", is_id: false, format: 'number', is_visible: true, is_additional: false},
    {name: "booked", title: "Бронь", is_id: false, format: 'number', is_visible: true, is_additional: false},
    {name: "default" , title: "Не разобрано", is_id: false, format: 'number', is_visible: true, is_additional: false},
    {name: "check" , title: "Проверка", is_id: false, format: 'number', is_visible: true, is_additional: false},
    {name: "selection" , title: "Подбор", is_id: false, format: 'number', is_visible: true, is_additional: false},

];

export const dataSpeed = [
    {id: 1, status_name: "Количество заявок", no_purpose: 3000,  rejected: 2000, deferred: 10000, booked:13422, default:1322, check:1452,  selection:1246},
    {id: 1, status_name: "Среднее время", no_purpose: "1 день 3 часа",  rejected: "1 день 3 часа", deferred: "1 день 3 часа", booked:"1 день 3 часа", default:"1 день 3 часа", check:"1 день 3 часа",  selection:"1 день 3 часа"},

];