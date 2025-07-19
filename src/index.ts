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

app.post("/api/todos", async (c) => {
  const { title } = await c.req.json<{ title: string }>();
  if (!title) {
    return c.json({ message: "タイトルは必須です" }, 400);
  }
  const newId = todos[todos.length - 1].id + 1;
  const newTodo: Todo = { id: newId, title, delete_flg: false };
  todos = [...todos, newTodo];
  return c.json(newTodo);
});

export default app
