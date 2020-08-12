<h1 align="center">Proffy</h1>

<p align="center">
This is the API Server that the web app "Proffy" and "Proffy Mobile" uses. <br>

This project was developed during the NLW - Next Level Week, offered by Rocketseat.
</p>
<br>
<p align="center">
<img src="https://img.shields.io/github/license/MarcoCPinho/proffy"/>
<img src="https://img.shields.io/github/repo-size/MarcoCPinho/proffy"/>
<img src="https://img.shields.io/github/last-commit/marcocpinho/proffy" />
<img src="https://img.shields.io/github/followers/Marcocpinho?style=social"/>
<img src="https://img.shields.io/badge/done%20by-MarcoCPinho-blueviolet"/>
</p>
<p align="center">
<a href="https://oxy-proffy-server.herokuapp.com/" target="_blank">Link</a> to the API.
<br>
<img src="https://img.shields.io/website?down_message=Down&up_message=Running&url=https%3A%2F%2Foxy-proffy.herokuapp.com%2F"/>
</p>

## About

Created using Typescript and SQLite.

### Techonologies

- [Express](https://expressjs.com/)
- [Knex](http://knexjs.org/)
- [SQLite3](https://www.sqlite.org/index.html)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [TypeScript](https://www.typescriptlang.org/)


##  Features

- [x] Responsive layout
- [x] Data registration (teachers)
- [x] Filters in the database (registered teachers)

### Requirements

- [ ]  [Git](https://git-scm.com)
- [ ]  [Node.js](https://nodejs.org/en/). 
- [ ] [VSCode](https://code.visualstudio.com/) (or any other coder).

### 🎲 Running the server

```bash 
# Clone this repository
$ git clone <https://github.com/MarcoCPinho/proffyReactServer> 

# Access the folder "proffyReactServer" from your terminal/cmd 

# Install dependencies
$ npm install 

# Run the server
$ npm start 

##
# If you want to create another database before running the server; delete the current one and run:
$ npm knex:migrate

# Then you run the server with:
$ npm start
```
