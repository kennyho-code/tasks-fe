import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import indexStyles from "../index.css";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: indexStyles },
];

export default function Index() {
  return (
    <div>
      HomePage
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}