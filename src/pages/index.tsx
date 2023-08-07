import { NextPageContext } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import Image from "next/image";

export default function App() {
  const { data: session } = useSession();
  const text1: string =
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi repudiandae quibusdam est iure exercitationem eaque maxime?";
  const text2: string =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, magni. Omnis nulla accusantium animi, quam impedit aliquam? Adipisci aperiam iusto neque atque eos qui voluptates, in deserunt delectus, accusamus tempora voluptatem maxime?";

  //const MyImage: any = session?.user?.image;
  return (
    <div className=" min-h-screen text-white flex items-center justify-center">
      <div className="mx-auto">
        <div className="text-center">
          <h3 className="text-2xl mb-2 font-semibold">{session?.user?.name}</h3>
        </div>
        <div className="text-center">
          <h3 className="text-xs font-semibold">{session?.user?.email}</h3>
          <h3 className="text-xs mb-2 mt-2 font-semibold text-red-500">
            You logged in using{" "}
            <span className="bg-blue-600 px-2 py-1 text-white capitalize">
              {session?.user?.provider}
            </span>
          </h3>
        </div>
        <div className="border border-white h-[200px] relative flex flex-col w-full rounded-lg">
          <div className="w-full text-right">
            <div className="py-6 px-3">
              <button
                onClick={() => signOut()}
                className="bg-blue-500 hover:bg-blue-700 text-md font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex justify-center mb-12 w-[50px]">
            <Image
              alt="image"
              src={session?.user?.image!}
              fill
              className="w-[20px] h-[20px] rounded-full mt-16"
            />
          </div>
        </div>
        <div className="text-center mt-16 py-10 border-t">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <h3 className="text-sm mb-2 ">{text1}</h3>
              <h3 className="text-xs mb-2 ">{text1}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
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
