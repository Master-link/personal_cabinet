# подготовка и запуск проекта

### Подготовка для запуска
- установить Redis (инструкции в инете полно) 
- установить бд PostgreSql 10 версии или выше (инструкции в инете полно) 
- установить ruby 3.0.1 и Ruby On Rails 6 (инструкции в инете полно)
- в корне проекта запустить bundle (здесь скорее всего что-то не заработает - нужно установить dev пакеты, это нормально)
- отредактировать config/database.yml - заменить на свои логопасы:
```
  username: postgres <--- здесь
  password: 111111 <--- здесь
```

# подготовка и запуск проекта в докере
 
---
* установить docker и docker-compose
* если докер можно запускать без sudo - sudo можно пропустить
---
1. sudo docker-compose run frontend yarn
2. sudo docker-compose down
3. sudo docker-compose up --build (потом только sudo docker-compose up)
4. sudo docker-compose exec --user "$(id -u):$(id -g)" website rails db:create
5. sudo docker-compose exec --user "$(id -u):$(id -g)" website rails db:migrate
6. sudo docker-compose exec --user "$(id -u):$(id -g)" website rails db:seed
7. нужно выяснить ip бэка - т.к. не найдено другого решения
 ```
sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' website
```
5. как будет известен ip бэка остановить docker-compose (Секд+С)  и заменить полученный ip в frontend/.env, менять толдько ip
6. выяснить ip фронта (можно просто открыть http://192.168.10.5:3010/)
```
sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' frontend
```
7. в config/config.yml заменить frontend ip на ip фронта: 
```
frontend: http://172.19.0.5:3010
```
8. выключить docker-compose (Ctrl+C)
9. и заново включить sudo docker-compose up
10. полученный ip открывать с портом 3010: например http://192.168.10.5:3010/
