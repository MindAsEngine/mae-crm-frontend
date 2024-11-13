

export const headerFromServer = [
    {name: "id",is_id:true, title: "ID", is_visible: true, is_additional: false, format: 'number'},
    {name: "date", format: 'string', is_visible: true, is_additional: 'false', is_id: false, title: 'Дата'},
    {name: 'fio', title: "ФИО", is_visible: true, is_additional: false, format: 'string'},
    {name: 'process', title: "Этап", is_visible: true, is_additional: false, format: 'enum'},
    {name: 'phone_number', title: "Номер телефона", is_visible: true, is_additional: false, format: 'string'},
    {name: 'broker', title: "Посредник", is_visible: true, is_additional: false, format: 'string'},
    {name: 'estate_type', title: "Тип недвижимости", is_visible: true, is_additional: false, format: 'string'},
];

export const data = [
    {id: 901234567, date: "12.12.2012" ,fio: "Светлана Кузьмина Светлана Кузьмина", process:"rejected", phone_number:"София Григорьева +998 98 890 12 34", broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234566, date: "12.12.2012" ,fio: "Светлана Кузьмина Светлана Кузьмина", process:"terminated", phone_number:"София Григорьева +998 98 890 12 34", broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234565, date: "12.12.2012" ,fio: "Светлана Кузьмина Светлана Кузьмина", process:"deferred", phone_number:"София Григорьева +998 98 890 12 34", broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234564, date: "12.12.2012" ,fio: "Светлана Кузьмина Светлана Кузьмина", process:"no-purpose", phone_number:"София Григорьева +998 98 890 12 34", broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234563, date: "12.12.2012" ,fio: "Светлана Кузьмина Светлана Кузьмина", process:"completed", phone_number:"София Григорьева +998 98 890 12 34", broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234562, date: "12.12.2012" ,fio: "Светлана Кузьмина Светлана Кузьмина", process:"booked", phone_number:"София Григорьева +998 98 890 12 34", broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
    {id: 901234561, date: "12.12.2012" ,fio: "Светлана Кузьмина Светлана Кузьмина", process:"default", phone_number:"София Григорьева +998 98 890 12 34", broker:"Людмила Сидорова", estate_type:"квартира с террасой"},
];