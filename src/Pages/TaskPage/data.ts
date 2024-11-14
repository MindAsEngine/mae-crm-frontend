

export const headerFromServer = [
    {name: "id",is_id:true, title: "ID", is_visible: true, is_additional: false, format: 'number'},
    {name: "date", format: 'date', is_visible: true, is_additional: 'false', is_id: false, title: 'Дата'},
    {name: 'fio', title: "ФИО", is_visible: true, is_additional: false, format: 'array'},
    {name: 'process', title: "Этап", is_visible: true, is_additional: false, format: 'enum'},
    {name: 'phone_number', title: "Номер телефона", is_visible: true, is_additional: false, format: 'array'},
    {name: 'broker', title: "Посредник", is_visible: true, is_additional: false, format: 'string'},
    {name: 'estate_type', title: "Тип недвижимости", is_visible: true, is_additional: false, format: 'string'},
];

export const data = [
    {id: 901234567, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьминаkejkj", "Светлана Кузьмина"], process:"rejected", phone_number:["София","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234566, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Свена Кузьмина"], process:"terminated", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234565, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"deferred", phone_number:["София Григорьева","+998 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234564, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"no-purpose", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234563, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светла Кузьмина"], process:"completed", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234562, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"booked", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234561, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"default", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
];