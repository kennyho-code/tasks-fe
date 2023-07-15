import {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  json,
  redirect,
} from "@remix-run/node";
import loginStyles from "../styles/login.css";
import { Form } from "@remix-run/react";
import { Prisma } from "prisma";
import { comparePassword } from "~/services/authService.server";
import { commitSession, getSession } from "~/sessions";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: loginStyles },
];

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
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
      </Form>
    </div>
  );
}
