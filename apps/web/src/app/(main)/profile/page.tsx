"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react"
import DialogUpdatePhoto from "./_components/dialog-update-photo";

const Profile = () => {
  const { data: session } = useSession();
  let avatar;

  if (session?.user.provider) {
    avatar = session.user.image!
  } else {
    avatar = session?.user.image ? `http://localhost:8000/user-images/${session.user.image}` : "https://github.com/shadcn.png";
  }

  return (
    <main className="w-full pt-[78px] min-h-svh">
      <div className="container lg:max-w-3xl">
        <div className="my-10">
          <h2 className="md:text-3xl text-xl font-bold text-athens-gray-950">Personal profile</h2>
        </div>
        <div>
          <div className="py-6 flex items-center gap-6">
            <Avatar className="aspect-square h-20 w-fit">
              <AvatarImage
                src={avatar}
              />
              <AvatarFallback>{session?.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {!session?.user.provider && (<DialogUpdatePhoto />)}
          </div>
          <div className="py-6 border-b border-b-slate-300">
            <p className="text-athens-gray-950">Full Name</p>
            <p className="mt-1 text-sm text-athens-gray-500">{session?.user.name!}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Profile
