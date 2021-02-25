import {update} from "./view/Todo.js";

export const todo = [
  {id: 0, name: 'write todo example', done: false, editing: false},
  {id: 1, name: 'publish it', done: false, editing: false},
  {id: 2, name: 'let people learn bbur', done: false, editing: false},
  {id: 3, name: 'force them to work like a dog', done: false, editing: false},
]

const onCheckedChange = item => e => update(() => item.done = e.target.checked);

const onEditClick = item => () => update(() => item.editing = true);

const onDeleteClick = item => () => update(() => todo.splice(todo.findIndex(_item => _item === item), 1));

const onCheckedChange = item => e => update(() => item.done = e.target.checked);

const onNameInput = item => e => update(() => item.name = e.target.value);

const onSubmit = item => e => update(() => {
  e.preventDefault();
  item.editing = false;
  delete item.lastVersion;
});

const onReset = item => e => update(() => {
  e.preventDefault();
  if (item.lastVersion) {
    Object.assign(item, item.lastVersion, {editing: false});
    delete item.lastVersion;
  } else {
    todo.splice(todo.findIndex(_item => _item === item), 1)
  }
});

const onInputConnect = item => e => {
  if (item.name) {
    item.lastVersion = {...item};
  }
  e.target.focus();
};



export const filters = [
  {name: "todo", enabled: true, condition: item => item.done === false},
  {name: "done", enabled: true, condition: item => item.done === true},
]
