import { Link } from "@remix-run/react";
import {
  json,
  redirect,
  type LinksFunction,
  type LoaderArgs,
  type V2_MetaFunction,
  createCookie,
} from "@remix-run/node";
import indexStyles from "../styles/index.css";
import { requireUserSession } from "~/sessions";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStyles },
];

export async function loader({ request }: LoaderArgs) {
  const cookie = request.headers.get("cookie");
  if (!cookie) {
    throw redirect("/login");
  }
  const cookieFromSession = createCookie(cookie);
  if (!cookieFromSession.name.startsWith("__session")) {
    throw redirect("/login");
  }

  return json({ message: "Hello, world!" });
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
  return (
    <div className="content-wrapper">
      <div className="tasks-wrapper">
        <h1>Dashboard</h1>
        <h2>Good morning, Jane Doe</h2>
        <Card />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Design</h2>
      </div>
      <ul>
        <li>
          <h3>Prepare dribble shot</h3>
          <p>Today 12:00</p>
        </li>
        <li>
          <h3>Invoice dashboard wirefram</h3>
          <p>Today</p>
        </li>
      </ul>

      <div className="card-footer">
        <h3>Go to Collection</h3>
      </div>
    </div>
  );
}
