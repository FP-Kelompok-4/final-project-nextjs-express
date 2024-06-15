"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react"
import DialogUpdatePhoto from "./_components/dialog-update-photo";

const Profile = () => {
  const { data: session } = useSession();
  

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
                src={'https://github.com/shadcn.png'}
              />
              <AvatarFallback>{session?.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <DialogUpdatePhoto />
            {/* <Dialog onOpenChange={handleDialogChange}>
              <DialogTrigger>
                <span className="underline font-semibold">Edit Photo</span>
              </DialogTrigger>
              <DialogPortal>
                <DialogClose asChild>
                  <button className="IconButton" aria-label="Close">
                    <X />
                  </button>
                </DialogClose>
              </DialogPortal>
              <DialogContent>
                <div>
                  <input
                    id="edit-avatar"
                    name="avatar"
                    type="file"
                    accept="images/*"
                    hidden
                    onChange={onChangeFile}
                  />
                  <label htmlFor="edit-avatar" className="underline font-semibold">Select Photo</label>
                </div>
                <div className="relative">
                  {newPhoto ? (
                    <>
                      <div className="relative aspect-square">
                        <Cropper
                          image={newPhoto}
                          crop={crop}
                          zoom={zoom}
                          aspect={4 / 4}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>
                      <div className="mt-4 flex gap-4">
                        <p>Zoom</p>
                        <Slider
                          min={1}
                          max={3}
                          defaultValue={[zoom]}
                          step={0.1}
                          onValueChange={(value) => setZoom(value[0])}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="aspect-square border-2 rounded-sm border-dashed border-gray-700 flex justify-center items-center">
                      <p className="text-center">A preview of your new photo will be included here.</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={handleCropImage} aria-label="Close">Save changes</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
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
