const express = require("express");
const { setTodo , getTodo, removeTodo, updateTodo  } = require("../controller");
const { requireSignin } = require("../middelware");
const route = express.Router();

route.post('/todo/set',requireSignin, setTodo);
route.get('/todo/get',requireSignin , getTodo);
route.post('/todo/remove',requireSignin , removeTodo);
route.post('/todo/update',requireSignin , updateTodo);

module.exports = route;
