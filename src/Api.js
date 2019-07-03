let dataBase = [
  { text: "todo 1", done: false, id: "lsFsz8ZzqW00cu0wNHX187Ns5mwOuorv" },
  { text: "todo 2", done: false, id: "n6TYFVLSJPg6dWU6UCI9JTLStFfF5NzN" },
  { text: "todo 3", done: false, id: "7xt9TdyYbJMBCW9K7OQgQoOP7qpcTb6A" }
];

export function fetchToDos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataBase);
    }, 3000);
  });
}

export function addTodo(todo) {
  dataBase = [...dataBase, todo];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todo);
    }, 3000);
  });
}

export function updateDone(id) {
  const indexTodo = dataBase.findIndex(todo => todo.id === id);
  const todo = dataBase[indexTodo];
  const nextTodo = { ...todo, done: !todo.done };
  dataBase = [
    ...dataBase.slice(0, indexTodo),
    nextTodo,
    ...dataBase.slice(indexTodo)
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(nextTodo);
    }, 3000);
  });
}
