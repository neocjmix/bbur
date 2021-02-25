import {button, div, h1, h2, header, input, label, li, main, section, ul} from '../../../src/html.js';
import {filters, todo} from '../state.js';
import TodoItem from './TodoItem.js';
import TodoItemEdit from './TodoItemEdit.js';
import createUpdater from "../../../src/util/createUpdater.js";

const getFilteredTodoList = () => todo
  .filter(item => filters
    .filter(({enabled}) => enabled)
    .map(({condition}) => condition(item))
    .reduce((passed1, passed2) => passed1 || passed2, false))

const onFilterChange = filter => e => update(() => filter.enabled = e.target.checked);

const onAddClick = () => update(() =>
  todo.push({
    id: todo.length + 1,
    name: '',
    done: false,
    editing: true
  }));

export const Todo = () => (
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

export const {update, bind} = createUpdater(Todo);
