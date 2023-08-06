import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Image from "next/image";

export default function App() {
  const { data: session } = useSession();

  const MyImage: any = session?.user?.image;
  return (
    <>
      <h1 className="text-red-600">Next-Auth authentication nextjs app</h1>;
      {session ? (
        <div>
          <h1 className="text-red-600">Welcome {session?.user?.name}</h1>
          <h1 className="text-red-600">email - {session?.user?.email}</h1>
          {/* <Image
            alt="image"
            src={MyImage}
            //className="object-cover object-center w-full h-full block"
            width="300"
            height="500"
          /> */}
          <button
            className="bg-red-700 text-white p-4 cursor-pointer"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-red-600">You are not sign in</h1>
          {/* <Image
            alt="image"
            src="https://dailypost.ng/wp-content/uploads/2023/02/Partey.jpg"
            // src="data:image/jpeg;base64,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"
            className="w-[50px] h-[50px] rounded-full"
            width="300"
            height="500"
          /> */}
          <button
            className="bg-green-700 text-white p-4 cursor-pointer"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}
