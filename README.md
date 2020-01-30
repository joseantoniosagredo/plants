# Plants Project

This project is created in order to have a historic about your plants :)

It is developed in [Node](https://nodejs.org/en/) and [React](https://reactjs.org/) (with [Redux](https://es.redux.js.org/)). The DB is [MongoDB](https://www.mongodb.com/) and i have used [Mongoose](https://mongoosejs.com/docs/index.html) library.


## Starting 🚀

_Continue the instruction if you want to run in localhost._


### Requirements 📋

_What do you need in order to start_

* Install [docker compose](https://docs.docker.com/compose/install/)
* Install [Node js and npm](https://nodejs.org/en/download/)

### Instalation 🔧

#### Production
_If you want to create the project in production you must_

Go to _/frontend_ folder and excute:
```
npm install
npm build
```
Next go to root folder and execute:
```
docker-compose up app
```
#### Develop
_If you want to start to develop with React or Node continue reeding_

In order to download all libraries, you must execute in root folder and _/frontend_ folder
```
npm install
```
for running backend execute in root folder:
```
docker-compose up app
```
If you want to run React you must do in _/frontend_ folder:
```
npm start
```