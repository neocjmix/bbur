import {form, input} from "../../src/html.js";
import {todo} from "./todoList.js";
import {on} from "../../src/util/on.js";
import {render} from "./App.js";

const onSubmit = item => e => {
  e.preventDefault();
  item.edit = false;
  delete item.lastVersion;
  render();
};

const onReset = item => e => {
  e.preventDefault();
  if (item.lastVersion) {
    Object.assign(item, item.lastVersion, {edit: false});
    delete item.lastVersion;
  } else {
    todo.splice(todo.findIndex(_item => _item === item), 1)
  }
  render();
};

const onCheckedChange = item => e => {
  item.done = e.target.checked;
  render();
};

const onNameInput = item => e => {
  item.name = e.target.value;
  render();
};

const onInputConnect = item => e => {
  if (item.name) {
    item.lastVersion = {...item};
  }
  e.target.focus();
};

const TodoItemEdit = ({item}) => (
  form({
    onSubmit: onSubmit(item),
    onReset: onReset(item)
  })(
    input({
      type: "checkbox", checked: item.done,
      onChange: onCheckedChange(item)
    }),
    input({
      type: 'text', value: item.name,
      onBBur: on('connect', onInputConnect(item)),
      onInput: onNameInput(item),
      onChange: onNameInput(item),
    }),
    ' ',
    input({type: 'submit', value: 'save'}),
    ' ',
    input({type: 'reset', value: 'cancel'}),
  )
);

export default TodoItemEdit;
