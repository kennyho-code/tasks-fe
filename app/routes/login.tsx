import { ActionArgs, LinksFunction, redirect } from "@remix-run/node";
import loginStyles from "../styles/login.css";
import { Form } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: loginStyles },
];

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  console.log(body.get("username"));
  // TODO: validate username and password
  return redirect("/dashboard");
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
