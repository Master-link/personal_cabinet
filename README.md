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
4. выключить docker-compose (Ctrl+C) 
5. sudo chmod 666 log/development.log
6. запустить sudo docker-compose up
7. открыть другую вкладку(вторая вкладка) терминала
8. sudo docker-compose exec --user "$(id -u):$(id -g)" website rails db:create
9. sudo docker-compose exec --user "$(id -u):$(id -g)" website rails db:migrate
10. sudo docker-compose exec --user "$(id -u):$(id -g)" website rails db:seed
11. нужно выяснить ip бэка (docker-compose (Ctrl+C) НЕ НУЖНО !) - т.к. не найдено другого решения:
 ```
sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' website
```
12. заменить полученный ip в frontend/.env, менять только ip
13. выяснить ip фронта:
```
sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' frontend
```
14. в config/config.yml заменить frontend ip на ip фронта: 
```
frontend: http://172.19.0.5:3010
```
15. выключить docker-compose (Ctrl+C) в первой вкладке
16. и заново включить sudo docker-compose up
17. полученный ip открывать с портом 3010: например http://ip_фронта:3010/
