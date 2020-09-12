import {span} from "../../src/html.js";

const TodoItem = ({id, name}) => (
  span({
    key: id,
    tabindex: 0,
    onClick: e => console.log(1, id),
    onKeyDown: e => e.key === "Enter" && console.log(id),
  })(name)
);

export default TodoItem;
