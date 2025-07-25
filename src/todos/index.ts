import { Hono } from "hono";

const app = new Hono();

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

/*
 * Todo一覧取得API
 */
app.get("/", (c) => c.json(todos.filter((todo) => !todo.delete_flg)));

/*
 * Todo登録API
 */
app.post("/", async (c) => {
  const { title } = await c.req.json<{ title: string }>();
  if (!title) {
    return c.json({ message: "タイトルは必須です" }, 400);
  }
  const newId = todos[todos.length - 1].id + 1;
  const newTodo: Todo = { id: newId, title, delete_flg: false };
  todos = [...todos, newTodo];
  return c.json(newTodo);
});

/*
 * Todo更新API
 */
app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const index = todos.findIndex((todo) => todo.id === Number(id));

  if (index === -1) {
    return c.json({ message: "Todoは存在しません" }, 404);
  }

  const { title } = await c.req.json<{ title: string }>();
  if (!title) {
    return c.json({ message: "タイトルは必須です" }, 400);
  }
  todos[index] = { ...todos[index], title };
  return c.json(todos[index]);
});

/*
 * Todo削除API
 */
app.put("/:id/delete", async (c) => {
  const id = c.req.param("id");
  const index = todos.findIndex((todo) => todo.id === Number(id));

  if (index === -1) {
    return c.json({ message: "Todoは存在しません" }, 404);
  }

  todos[index] = { ...todos[index], delete_flg: true };
  return c.json(todos[index]);
});

export default app;
