# WebCITGRework

Для запуска установите нужные пакеты через pip.


```
pip install -r requirements.txt
```

Подгрузите БД  и проведите миграции:

Подгрузка:
```
python3 manage.py loaddata db.json
```

Миграции:

```
python3 manage.py makemigrations
python3 manage.py migrate
```



Создайте суперюзера:

```
python3 manage.py createsuperuser
```

И из этой директории:

```
python3 manage.py runserver
```

В админку залезайте через http://127.0.0.1:8000/admin/.

Лучше работайте через виртуальную среду, чтобы не натянуть лишнего говна.


