import {form, input} from "../../src/html.js";
import {todo} from "./state.js";
import {on} from "../../src/util/on.js";
import {update} from "./Todo.js";

const onCheckedChange = item => e => update(() => item.done = e.target.checked);

const onNameInput = item => e => update(() => item.name = e.target.value);

const onSubmit = item => e => update(() => {
  e.preventDefault();
  item.edit = false;
  delete item.lastVersion;
});

const onReset = item => e => update(() => {
  e.preventDefault();
  if (item.lastVersion) {
    Object.assign(item, item.lastVersion, {edit: false});
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
