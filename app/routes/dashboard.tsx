import { Link } from "@remix-run/react";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import indexStyles from "../index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStyles },
];

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
      </ul>
    </div>
  );
}

function Content() {
  return (
    <div className="content-wrapper">
      <p>content</p>
    </div>
  );
}
