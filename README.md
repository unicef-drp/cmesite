## Initial Install

### Services

### Mysql

On rp3 run:

```
# docker pull mysql
# mkdir /opt/mysql-data
# docker service create -d --name=mysql --network net1 --constraint 'node.hostname==rp3' --replicas 1  -e MYSQL_ROOT_PASSWORD=pasdire --mount type=bind,src=/opt/mysql-data,dst=/var/lib/mysql -d mysql
```

Create a database:

```
$ docker service ls
$ docker ps
$ docker exec -it mysql.1.x0r052489isx530a0d6lz8ssx bash
# mysql -u root -p
mysql> create database cmdev;
``

