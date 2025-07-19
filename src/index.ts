import { Hono } from 'hono'
import todos from './todos'
import { cors } from 'hono/cors';

const app = new Hono()

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
    credentials: true,
  }),
)

app.route("/api/todos", todos);

export default app
