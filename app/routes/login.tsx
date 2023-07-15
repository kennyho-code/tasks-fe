import {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  createCookie,
  json,
  redirect,
} from "@remix-run/node";
import loginStyles from "../styles/login.css";
import { Form, Link } from "@remix-run/react";
import { Prisma } from "prisma";
import { comparePassword } from "~/services/authService.server";
import { commitSession, getSession } from "~/sessions";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: loginStyles },
];

export async function loader({ request }: LoaderArgs) {
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;

  const cookieFromSession = createCookie(cookie);
  if (cookieFromSession.name.startsWith("__session")) {
    // throw redirect("/dashboard");
    throw redirect("/dashboard");
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const body = await request.formData();
  const user = await Prisma.user.findUnique({
    where: { username: body.get("username") as string },
  });

  if (!user) {
    throw new Error("user not found");
  }

  const isAuthenticated = comparePassword(
    body.get("password") as string,
    user.password
  );

  if (!isAuthenticated) {
    throw new Error("invalid password");
  }
  console.log("session: ", session);
  // TODO: validate username and password
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function LoginIndex() {
  return (
    <div className="login-container">
      <Form method="post">
        <label htmlFor="username">username:</label>
        <input type="text" name="username" placeholder="Username" />
        <br />
        <label htmlFor="password">password:</label>
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button className="login-button" type="submit">
          Login
        </button>
        <br />
        <Link to="/register">Register</Link>
      </Form>
    </div>
  );
}
