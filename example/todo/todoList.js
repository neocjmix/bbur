export const todo = [
  {id: 0, name: 'write todo example', done: false, editing: false},
  {id: 1, name: 'publish it', done: false, editing: false},
  {id: 2, name: 'let people learn bbur', done: false, editing: false},
  {id: 3, name: 'force them to work like a dog', done: false, editing: false},
]

export const filters = [
  {name: "todo", enabled: true, condition: item => item.done === false},
  {name: "done", enabled: true, condition: item => item.done === true},
]
