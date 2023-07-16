import { Form, Link, useLoaderData } from "@remix-run/react";
import {
  json,
  redirect,
  type LinksFunction,
  type LoaderArgs,
  type V2_MetaFunction,
  createCookie,
  ActionArgs,
} from "@remix-run/node";
import indexStyles from "../styles/index.css";
import { getSession, requireUserSession } from "~/sessions";
import { Prisma } from "prisma";
import { Task } from "@prisma/client";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStyles },
];

export async function action({ request }: ActionArgs) {
  const session = getSession(request.headers.get("Cookie"));

  console.log("session: ", (await session).get("userId"));

  const data = await request.formData();
  const title = data.get("title") as string;
  if (!title) {
    throw new Error("title is required");
  }

  const userId = parseInt((await session).get("userId") as string);

  await Prisma.task.create({
    data: { title: title, userId: userId },
  });

  console.log("title: ", title);

  console.log("data: ", data);
  return null;
}

export async function loader({ request }: LoaderArgs) {
  const cookie = request.headers.get("cookie");
  if (!cookie) {
    throw redirect("/login");
  }
  const cookieFromSession = createCookie(cookie);
  if (!cookieFromSession.name.startsWith("__session")) {
    throw redirect("/login");
  }

  const session = getSession(request.headers.get("Cookie"));
  const userId = parseInt((await session).get("userId") as string);

  const tasks = await Prisma.task.findMany({ where: { userId } });
  console.log("tasks: ", tasks);
  return json({ tasks });
}

export default function DashboardIndex() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Content />
    </>
  );
}

function NavBar() {
  return <div className="header"></div>;
}

function SideBar() {
  return (
    <div className="side-bar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

function Content() {
  const tasks = useLoaderData().tasks;
  console.log("tasks: ", tasks);

  const currentTasks = tasks.map((task: Task) => <Card title={task.title} />);
  console.log(currentTasks);

  return (
    <div className="content-wrapper">
      <div className="tasks-wrapper">
        <h1>Dashboard</h1>
        <h2>Good morning, Jane Doe</h2>
        {currentTasks}
      </div>
      <Form method="post">
        <input type="text" name="title" />
        <br />
        <button type="submit">Add Task</button>
      </Form>
    </div>
  );
}

function Card({ title }: { title: string }) {
  console.log("hello");
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
    </div>
  );
}
