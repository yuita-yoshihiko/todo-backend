import { Hono } from 'hono'

const app = new Hono()

type Todo = {
  id: number;
  title: string;
  delete_flg: boolean;
};

let todos: Todo[] = [
  { id: 1, title: "Reactを勉強する", delete_flg: false },
  { id: 2, title: "Vue.jsを勉強する", delete_flg: false },
  { id: 3, title: "Next.jsを勉強する", delete_flg: false },
];

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/api/todos", (c) => c.json(todos.filter((todo) => !todo.delete_flg)));

export default app
