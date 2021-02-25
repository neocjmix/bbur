import {button, input, label, span} from "../../src/html.js";
import {todo} from "./state.js";
import {Todo} from "./Todo.js";

const onCheckedChange = item => e => Todo.update(() => item.done = e.target.checked);

const onEditClick = item => () => Todo.update(() => item.editing = true);

const onDeleteClick = item => () => Todo.update(() => todo.splice(todo.findIndex(_item => _item === item), 1));

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
