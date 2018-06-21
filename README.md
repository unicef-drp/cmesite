# Childmortality


## Initial Install

### Services

### Mysql

On rp3 run:

```
# mkdir /opt/mysql-data
#  docker run --restart=always --name=mysql -v /opt/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=pasdire -d mysql:5.7
```

Create a database:

```
$ docker ps | grep mysql
$ docker exec -it mysql bash
# mysql -u root -p
mysql> create database cmdev;
```

Connect to Mysql:

```
# docker exec -it mysql bash
mysql# mysql -u root -p
Enter password:
mysql> show databases;
```


### Wordpress

```
# docker run --name=wordpress --restart=always --link mysql:mysql -p 8080:80  -d wordpress
```

Install plugins:

* WP REST API
* Custom Post Type UI
* Advanced Custom Fields
