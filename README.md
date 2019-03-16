# Childmortality

## CI/CD

> Deployed on `kube-rp` both on `staging` and `qa` envs.

|env|git branch|wordpress admin|cme url|
|---|----------|--------------|-------|
|staging|develop|http://wordpress.staging.cme.redpelicans.com/wp-admin/|http://cme.staging.redpelicans.com/|
|qa|master|http://wordpress.qa.cme.redpelicans.com/wp-admin/|http://cme.qa.redpelicans.com/|

*WordPress admin:*
```
  Username: root
  Password: p******
```

## Setup

### Wordpress

**1. install and activate plugins**
* [WordPress REST API (Version 2)](https://github.com/WP-API/WP-API)
* [Only Rest API by Braad Martin](https://wordpress.org/plugins/only-rest-api/)
* [ACF to REST](https://wordpress.org/plugins/acf-to-rest-api/)
* [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/)
* [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)
* [Tuxedo Big File Uploads](https://wordpress.org/plugins/tuxedo-big-file-uploads/)
* [WordPress importer](https://wordpress.org/plugins/wordpress-importer/)

**2. export/import advanced custom fields**
* export Custom Fields > Tools > export (JSON file)
* import Custom Fields > Tools > import

**3. export/import custom post types**
* export CPT UI > Tools > Copy (JSON)
* import CPT UI > Tools > Paste (JSON)

**4. export/import data**
* Tools > Export (XML file)
* Tools > Import > WordPress run importer > choose file

> check users roles (there are not properly set after import)

### Kubernetes

#### ConfigMap

2 ConfigMaps are used to mount `config.json` in containers. Because there is yet no way to update them they are not managed in CI/CD pipelines.

First create `ConfigMap` for all envs:

```
$ kubectl create configmap cme-config-staging --from-file=config=params/staging.json
$ kubectl create configmap cme-config-qa --from-file=config=params/qa.json
```

List them:

```
$ kubectl get configmaps
NAME                 DATA      AGE
cme-config-qa        1         6m
cme-config-staging   1         6m

```

Delete one:

```
$ kubectl delete configmaps cme-config-qa

```

### Jira

https://redpelicans.atlassian.net
