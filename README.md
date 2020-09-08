# Coalitioninc Task

A simple broker-user registry

## Usage

Clone repository with one of the following ways and start coding.

with HTTPS:

```shell
git clone https://github.com/barhantas/coalitioninc-task.git
```

with SSH:

```shell
git clone git@github.com:barhantas/coalitioninc-task.git
```
## FOR RUN WITH NODE

### Prerequisites
Make sure that you have Node and python installed.

### Installation UI
```shell
yarn install
```

### Start UI
```shell
yarn start
```

### Installation Server
```shell
cd api
```
```shell
python3 -m venv venv
```
```shell
source venv/bin/activate
```
```shell
pip install --upgrade pip
```
```shell
pip install -r requirements.txt
```
```shell
flask db init
```
```shell
flask db migrate -m "create tables"
```
```shell
flask db upgrade
```

### Start Server
on the package.json root
```shell
yarn start-api
```


## FOR RUN WITH DOCKER
--------

