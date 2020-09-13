import {button, div, h1, h2, header, input, label, li, main, section, ul} from '../../src/html.js';
import sync from '../../src/core/sync.js';
import {filters, todo} from './todoList.js';
import TodoItem from './TodoItem.js';
import TodoItemEdit from './TodoItemEdit.js';

const getFilteredTodoList = () => todo
  .filter(item => filters
    .filter(({enabled}) => enabled)
    .map(({condition}) => condition(item))
    .reduce((passed1, passed2) => passed1 || passed2, false))

const onFilterChange = filter => e => {
  filter.enabled = e.target.checked;
  render();
};

const onAddClick = () => {
  todo.push({
    id: todo.length + 1,
    name: '',
    done: false,
    editing: true
  });
  render();
};

export const App = () => (
  div({id: 'app-container'})(
    header(
      h1('TODO')
    ),
    main(
      section(
        h2('filter'),
        filters.map(filter => (
          label(
            input({type: 'checkbox', checked: filter.enabled, onChange: onFilterChange(filter)}),
            filter.name,
          )
        ))
      ),
      section(
        h2('list'),
        ul(
          getFilteredTodoList().map(item => (
            li({key: item.id})(
              item.editing ? TodoItemEdit({item}) : TodoItem({item})
            )
          )),
        ),
        todo.every(({editing}) => !editing) && button({onClick: onAddClick})('add'),
      )
    ),
  )
);

export const render = () => sync(App, document.getElementById('app-container'));

