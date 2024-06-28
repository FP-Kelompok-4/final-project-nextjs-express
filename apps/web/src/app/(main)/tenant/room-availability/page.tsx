"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { FromRoomAvailabilityPriceSchema } from "@/schemas/form-room-availability-price-schema";
import DialogCustomAdmin from "@/components/Dialog-Custom-Admin"
import FormSetRoomAvailability from "./_components/Form-Set-Room-Availability"
import RoomAvailableTable from "./_components/RoomAvailabilityTable"

const RoomAvailability = () => {
  const [openDialogSetAvailability, setOpenDialogSetAvailability] = useState<boolean>(false);
  const [modalPopover, setModalPopover] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FromRoomAvailabilityPriceSchema>>({
    resolver: zodResolver(FromRoomAvailabilityPriceSchema),
    defaultValues: {
      id: "",
    }
  });

  const handleOpenDialogSetAvailability = (open: boolean) => {
    setOpenDialogSetAvailability(open);
    setModalPopover(false);
    form.reset();
  }

  return (
    <main className="min-h-svh pt-[78px] px-6 md:px-10 xl:px-20 ">
      <DialogCustomAdmin
        titleDialogContent="Add room availability"
        descripDialogContent="If you want to change room availability, first delete the room availability that you have set. Because the room that has been set is not available in the field room."
        onOpenChange={handleOpenDialogSetAvailability}
        open={openDialogSetAvailability}
      >
        <FormSetRoomAvailability
          form={form}
          handleOpenDialogSetAvailability={handleOpenDialogSetAvailability}
          modalPopover={modalPopover}
        />
      </DialogCustomAdmin>
      <div className="my-6 flex md:flex-row flex-col justify-between md:items-center">
        <h1 className="text-lg md:text-2xl font-bold text-slate-900">Room Availability</h1>
        <Button
          onClick={() => {
            handleOpenDialogSetAvailability(true);
            setModalPopover(true);
          }}
        >
          Add Room Availability
        </Button>
      </div>
      <RoomAvailableTable />
    </main>
  )
}

export default RoomAvailability