import { createCookie, createCookieSessionStorage, redirect } from "@remix-run/node";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",

        // // all of these are optional
        // domain: "remix.run",
        // // Expires can also be set (although maxAge overrides it when used in combination).
        // // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
        // //
        // // expires: new Date(Date.now() + 60_000),
        // httpOnly: true,
        // maxAge: 60,
        // path: "/",
        // sameSite: "lax",
        secrets: ["s3cret1"],
      },
    }
  );

  async function requireUserSession(request: Request) {
    // get the session
    const cookie = request.headers.get("cookie");
    if(!cookie){
        throw redirect("/login");
    }
    const cookieFromSession = createCookie(cookie);
    if(commitSession.name !== "__session"){
        throw redirect("/login");
    }
    console.log('cookie: ', cookie);


    const session = await getSession(cookie);

    console.log('session: ', session);
  
    // // validate the session, `userId` is just an example, use whatever value you
    // // put in the session when the user authenticated
    // if (!session.has("userId")) {
    //   // if there is no user session, redirect to login
    //   throw redirect("/login");
    // }
  
    return session;
  }



export { getSession, commitSession, destroySession, requireUserSession };