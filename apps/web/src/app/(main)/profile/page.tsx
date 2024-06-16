"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react"
import DialogUpdatePhoto from "./_components/dialog-update-photo";
import { BadgeCheck, BadgeX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { getAccountThunk } from "@/redux/slices/settings-thunk";
import { showDateForBirthdate } from "@/lib/formatDate";

const Profile = () => {
  const { data: session } = useSession();
  let avatar;

  if (session?.user.provider === "google") {
    avatar = session.user.image!
  } else {
    avatar = session?.user.image ? `http://localhost:8000/user-images/${session.user.image}` : "https://github.com/shadcn.png";
  }

  const dispatch = useAppDispatch();

  const defaultValues = useAppSelector(
    (state) => state.settingsReaducer.account,
  );

  useEffect(() => {
    if (session) dispatch(getAccountThunk(session.user.id));
  }, [session]);

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
            {session?.user.provider !== "google" && (<DialogUpdatePhoto />)}
          </div>
          <div className="py-6 border-b border-b-slate-300">
            <p className="text-athens-gray-950">Full Name</p>
            <p className="mt-1 text-sm text-athens-gray-500">{session?.user.name!}</p>
          </div>
          <div className="py-6 border-b border-b-slate-300">
            <p className="text-athens-gray-950">Email</p>
            <div className="flex justify-between gap-4">
              <p className="mt-1 text-sm text-athens-gray-500">{session?.user.email!}</p>
              {session?.user.isVerified ? (
                <div className="flex gap-2 text-gossamer-500">
                  <p className="text-sm self-center">Verified</p>
                  <BadgeCheck size={20} />
                </div>
              ) : (
                <div className="flex gap-2 text-red-500">
                  <p className="text-sm self-center">Not verified</p>
                  <BadgeX size={20} />
                </div>
              )}
            </div>
          </div>
          {defaultValues.birthdate && (
            <div className="py-6 border-b border-b-slate-300">
              <p className="text-athens-gray-950">Birthdate</p>
              <p className="mt-1 text-sm text-athens-gray-500">{showDateForBirthdate(defaultValues.birthdate)}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Profile
