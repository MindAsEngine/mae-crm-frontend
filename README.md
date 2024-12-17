### docker ###
```bash
docker build . -t "frontend:v1.0"
docker run -p 3000:3000 frontend:v1.0
```

### api ###
В файле `api.yaml` описаны необходимые методы.
Для запуска мок-сервера необходимо выполнить команду:
```bash
npm install -g @stoplight/prism-cli
prism mock api.yaml
```

[//]: # (todo create forms user, login, task) 

[//]: # (todo filters + onckick)

[//]: # (todo select time, )

[//]: # (todo sorting)

[//]: # (todo docs api audience, task)

### Описание
*Структура ответа для страниц-table:*
1. headers - массив описаний одной ячейки для заголовка таблицы, который указывает на свойсва столбца.
    * is_sortable - возможность сортировки по столбцу.
    * is_aside_header - является ли столбец столбцом заголовков
    * name - имя столбца.
    * is_id - является ли столбец идентификатором.
    * title - заголовок столбца.
    * is_visible - видимость столбца.
    * is_additional - является ли столбец дополнительным, то есть можно ли его скрыть через кастом.
    * format - формат столбца (типы: number, enum, string, array, date).
2. data - массив объектов, где каждый объект - это строка таблицы.
    * is_anomaly - является ли строка аномалией.
    * ключ - название столбца, значение - значение ячейки.
3. footer - объект, где строка таблиц - итоговые значения.
    * ключ - название столбца, значение - значение ячейки.
