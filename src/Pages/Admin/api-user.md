### Пример HTTP-запроса к API
**Метод:** `GET`  
**URL:** `/api/users`
#### Параметры запроса (Query Parameters)
| Параметр | Тип         | Обязателен | Описание                                                                                                                   |
|--------|-------------|------------|----------------------------------------------------------------------------------------------------------------------------|
| `search` | `string`    | Нет        | Поиск по ФИО. Если пустой, поиск не применяется.                                                                           |
| `sort` | `string`    | Нет        | Поле для сортировки (`fio_asc`, `fio_desc`, и т.д.) |
---
### Пример GET-запроса
*Пример ответа в файле `users.json`*

**Пример 1: Без фильтров**

```http
GET /api/users
```
**Пример 2: Поиск по ФИО**
```http
GET /api/users?search=Ив
```
**Пример 3: Сортировка по ФИО по убыванию**
```http 
GET /api/users?sort=fio_desc
```

### Пример POST-запроса
**Пример 1: Создание нового пользователя**
```http
POST /api/users
Content-Type: application/json

{
  "name": "Иван",
  "surname": "Иванов",
  "patronymic": "Иванович",
  "login": "ivanov",
  "password": "123456",
}
```
*Пример ответа: успех*
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1
}
```
*Пример ответа: ошибки*
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
  "Пользователь с таким логином уже существует",
  "Пароль должен содержать не менее 6 символов",
  "Поле 'Фамилия' не может быть пустым"
  ]               
}
```




### Пример PUT-запроса
**Пример 1: Обновление данных пользователя**
```http
PUT /api/users/1
Content-Type: application/json

{
  "name": "Иван",
  "surname": "Иванов",
  "patronymic": "Иванович",
  "login": "ivanov",
  "password": "123456"
}
```
*Пример ответа: успех*
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1
}
```
*Пример ответа: ошибки*
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
  "Пароль должен содержать не менее 6 символов",
    "Поле 'Фамилия' не может быть пустым",
    "Пользователь с таким логином уже существует"
  ]             
}
```





