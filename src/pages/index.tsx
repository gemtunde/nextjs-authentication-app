import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function App() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        <h1 className="text-red-600">Next-Auth authentication nextjs app</h1>;
        <h1 className="text-red-600">Welcome to Next-Auth</h1>;
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}
