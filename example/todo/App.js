import {button, div, form, h1, header, input, li, main, ul} from '../../src/html.js';
import sync from '../../src/core/sync.js';
import TodoItem from "./TodoItem.js";

const container = document.getElementById('app');
let isAddFormVisible = false;
let newTodoName = '';

const todo = [
  {id: 0, name: 'write todo example', done: false},
  {id: 1, name: 'publish it', done: false},
  {id: 2, name: 'let people learn bbur', done: false},
  {id: 3, name: 'force them to work like a dog', done: false},
]

const showAddForm = () => {
  isAddFormVisible = true;
  sync(App, container)
};

const hideAddForm = () => {
  isAddFormVisible = false;
  sync(App, container)
};

const handleInput = e => {
  newTodoName = e.target.value;
  sync(App, container)
};

const addTodo = name => e => {
  e.preventDefault();
  todo.push({name, id: todo.length, done: false});
  newTodoName = ''
  sync(App, container)
};

const on = (type, handler) => e => e.detail.type === type && handler(e);

const App = () => (
  div({id: 'app-container'})(
    header(
      h1('TODO')
    ),
    main(
      ul(
        todo.map(({id, name}) => li({key: id})(TodoItem({id, name}))),
        li(
          isAddFormVisible
            ?
            form({onSubmit: addTodo(newTodoName)})(
              input({
                type: 'text', value: newTodoName,
                onBBur: on('connect', e => e.target.focus()),
                onKeydown: e => e.key === 'Escape' && hideAddForm(),
                onInput: handleInput,
                onChange: handleInput,
                onFocusout: hideAddForm,
              }),
              input({type: 'submit', value: '+'}),
            )
            :
            button({onClick: showAddForm})('+'),
        ),
      ),
    ),
  )
);

sync(App, container)
