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

### Prerequisites
Make sure that you have Node and python installed.

## React App

### Installation UI

```shell
cd coalitioninc-task
```
```shell
yarn install
```

### Start UI
```shell
yarn start
```



## Flask App

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
```shell
python data-loader.py
```

### Start Server
on the package.json root
```shell
yarn start-api
```


## Pre-loaded brokers
### default password is "123456"
### agencyId = 1

