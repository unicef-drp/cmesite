# Childmortality

## Initial Install

### Services

### Mysql

On rp3 run:
```
# mkdir /opt/mysql-data
#  docker run --restart=always --name=mysql -v /opt/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=pasdire -d mysql:5.7
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
# docker run --name=wordpress-test --restart=always --link mysql:mysql -p 8080:80  -e WORDPRESS_DB_NAME=wpdev -d wordpress
# docker run --name=wordpress-staging --restart=always --link mysql:mysql -p 8585:80 -e WORDPRESS_DB_NAME=wpstg -d wordpress
```

Launch your browser to `http://rp3.redpelicans.com:8080` for `test`, `http://rp3.redpelicans.com:8585` for `staging`.
```
  Username: root
  Password: p******
```

Installed plugins:

* WP REST API
* Custom Post Type UI (add custom REST resources)
* Advanced Custom Fields (add custom fields to WP/custom resources)
* Only Rest API
* ACF to REST (expose custom fields to REST API)
* Filter Fields (filter fields to have only useful data through API)

### Docker

Docker images are built and deployed with gitlab CI/CD (see .gitlab-ci.yml)

** CARE to update `rp3@root:/opt/cm/etc/config.*.json` when /public/config.json is updated**

### Jira

https://redpelicans.atlassian.net
