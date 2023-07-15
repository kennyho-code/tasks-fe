import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request.headers.get("cookie"));
  throw redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
