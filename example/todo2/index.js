import {bind} from "./view/Todo.js";

export const todoList = new TodoList();

bind(document.getElementById('app'));
