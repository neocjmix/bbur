import {button, input, label, span} from "../../src/html.js";
import {todo} from "./todoList.js";
import {render} from "./App.js";

const onCheckedChange = item => e => {
  item.done = e.target.checked;
  render();
};

const onEditClick = item => () => {
  item.edit = true;
  render();
};

const onDeleteClick = item => () => {
  todo.splice(todo.findIndex(_item => _item === item), 1)
  render();
};

const TodoItem = ({item}) => (
  label(
    input({
      type: "checkbox", checked: item.done,
      onChange: onCheckedChange(item)
    }),
    span(item.name),
    ' ',
    button({
      onClick: onEditClick(item)
    })('edit'),
    ' ',
    button({
      onClick: onDeleteClick(item)
    })('delete'),
  )
);

export default TodoItem;
