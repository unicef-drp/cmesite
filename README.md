# Childmortality

## CI/CD


Deployed on `kube-rp` both on `staging` and `qa` envs.


### Staging env

Linked to `develop` branch. 

#### Wordpress

Available on [http://staging.wp.cme.redpelicans.com/wp-admin](http://staging.wp.cme.redpelicans.com/wp-admin)

```
  Username: root
  Password: p******
```

#### CME Site

Available on [http://staging.cme.redpelicans.com](http://staging.cme.redpelicans.com)

### QA env

Linked to `master` branch. 

#### Wordpress

Available on [http://qa.wp.cme.redpelicans.com/wp-admin](http://qa.wp.cme.redpelicans.com/wp-admin)

```
  Username: root
  Password: p******
```

#### CME Site

Available on [http://qa.cme.redpelicans.com](http://qa.cme.redpelicans.com)

## Setup

### Wordpress

#### Plugins

* WordPress REST API (Version 2)
* Custom Post Type UI (add custom REST resources)
* Advanced Custom Fields (add custom fields to WP/custom resources)
* Only Rest API by Braad Martin
* ACF to REST (expose custom fields to REST API)
* WP REST API - filter fields (filter fields to have only useful data through API)
* Tuxedo Big File Uploads (handle size upload limit)

#### Backup

- CPT UI: Tools > copy/paste 'Export Post Types'
- For editorial content, use WP exporter tool

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
