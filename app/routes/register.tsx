import { Form } from "@remix-run/react";
import registerStyles from "../styles/register.css";
import { ActionArgs, LinksFunction, redirect } from "@remix-run/node";
import { hashPassword } from "~/services/authService.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: registerStyles },
];

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  console.log(body.get("username"));
  const hashedPassword = hashPassword(body.get("password") as string);

  console.log("hashedPassword", hashedPassword);
  // TODO: validate username and password
  return redirect("/dashboard");
}

export default function RegisterIndex() {
  return (
    <div className="register-container">
      <Form method="post">
        <label htmlFor="username">username:</label>
        <input required type="text" name="username" placeholder="Username" />
        <br />
        <label htmlFor="password">password:</label>
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
        />
        <br />
        <button className="register-button" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
}
