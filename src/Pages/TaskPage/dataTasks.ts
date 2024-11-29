

export const headerFromServerTasks = [
    {name: "id",is_id:true, title: "ID", is_visible: true, is_additional: false, format: 'number'},
    {name: "date", format: 'date', is_visible: true, is_additional: 'false', is_id: false, title: 'Дата'},
    {name: 'fio', title: "ФИО", is_visible: true, is_additional: false, format: 'array'},
    {name: 'process', title: "Этап", is_visible: true, is_additional: false, format: 'enum'},
    {name: 'phone_number', title: "Номер телефона", is_visible: true, is_additional: false, format: 'array'},
    {name: 'broker', title: "Посредник", is_visible: true, is_additional: false, format: 'string'},
    {name: 'estate_type', title: "Тип недвижимости", is_visible: true, is_additional: false, format: 'string'},
];

export const dataTasks = [
    {id: 901234567, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьминаkejkj", "Светлана Кузьмина"], process:"rejected", phone_number:["София","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234566, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Свена Кузьмина"], process:"terminated", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234565, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"deferred", phone_number:["София Григорьева","+998 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234564, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"no-purpose", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234563, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светла Кузьмина"], process:"completed", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234562, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"booked", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234561, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"default", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 801234587, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьминаkejkj", "Светлана Кузьмина"], process:"rejected", phone_number:["София","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 801234566, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Свена Кузьмина"], process:"terminated", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 801234565, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"deferred", phone_number:["София Григорьева","+998 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 801234564, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"no-purpose", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 801234563, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светла Кузьмина"], process:"completed", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 801234562, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"booked", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 701234561, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"default", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234007, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьминаkejkj", "Светлана Кузьмина"], process:"rejected", phone_number:["София","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 701234566, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Свена Кузьмина"], process:"terminated", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 701234565, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"deferred", phone_number:["София Григорьева","+998 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 701234564, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"no-purpose", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 701234563, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светла Кузьмина"], process:"completed", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 701234562, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"booked", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 701234560, date: "Sat Oct 19 2024 17:47:50 GMT+0300 (Москва, стандартное время)" ,fio: ["Светлана Кузьмина", "Светлана Кузьмина"], process:"default", phone_number:["София Григорьева","+998 98 890 12 34"], broker:"Людмила Сидорова", estate_type:"квартира с террасой"},

];
export const customFiltersFromServer = [
    {name: "process", title: "Статус", options: [
            {name: "rejected", title: "Отказ", color:"red"},
            {name: "terminated", title: "Сделка расторгнута", color:"red"},
            {name: "deferred", title: "Отложено", color:"grey"},
            {name: "no-purpose", title: "Не целевое", color:"grey"},
            {name: "completed", title: "Сделка проведена", color:"green"},
            {name: "booked", title: "Бронь", color:"yellow"},
            {name: "default" , title: "Не разобрано", color:"grey"},
        ], type: "select"},
    {name: "city", title: "Город", options: [
            {name: "city1", title: "Город1"},
            {name: "city2", title: "Город2"},
            {name: "city3", title: "Город3"},
        ], type: "select"},
    {name: "estate22", title: "Тип недвижимости", options: [
            {name: "estate1", title: "Тип недвижимости1"},
            {name: "estate2", title: "Тип недвижимости2"},
            {name: "estate3", title: "Тип недвижимости3"},
        ], type: "select"},
    {name: "estate221", title: "Тип недвижимости", options: [
            {name: "estate1", title: "Тип недвижимости1"},
            {name: "estate2", title: "Тип недвижимости2"},
            {name: "estate3", title: "Тип недвижимости3"},
        ], type: "select"},
    {name: "estate2", title: "Тип недвижимости", options: [
            {name: "estate1", title: "Тип недвижимости1"},
            {name: "estate2", title: "Тип недвижимости2"},
            {name: "estate3", title: "Тип недвижимости3"},
        ], type: "select"},
    {name: "estate1", title: "Тип недвижимости", options: [
            {name: "estate1", title: "Тип недвижимости1"},
            {name: "estate2", title: "Тип недвижимости2"},
            {name: "estate3", title: "Тип недвижимости3"},
        ], type: "select"},
    {name: "estate5", title: "Тип недвижимости", options: [
            {name: "estate1", title: "Тип недвижимости1"},
            {name: "estate2", title: "Тип недвижимости2"},
            {name: "estate3", title: "Тип недвижимости3"},
        ], type: "select"},
    {name: "estate15", title: "Тип недвижимости", options: [
            {name: "estate1", title: "Тип недвижимости1"},
            {name: "estate2", title: "Тип недвижимости2"},
            {name: "estate3", title: "Тип недвижимости3"},
        ], type: "select"},
    {name: "estate51", title: "Тип недвижимости", options: [
            {name: "estate1", title: "Тип недвижимости1"},
            {name: "estate2", title: "Тип недвижимости2"},
            {name: "estate3", title: "Тип недвижимости3"},
        ], type: "select"},
]