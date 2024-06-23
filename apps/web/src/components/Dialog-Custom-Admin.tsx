import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogPortal, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { DialogDescription } from "@radix-ui/react-dialog"

const DialogCustomAdmin = ({
  titleDialogContent,
  open,
  onOpenChange,
  children
}:{
  titleDialogContent: string,
  open: boolean,
  onOpenChange: (open: boolean) => void,
  children: React.ReactNode
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogClose asChild>
          <button className="IconButton" aria-label="Close">
            <X />
          </button>
        </DialogClose>
      </DialogPortal>
      <DialogContent aria-describedby="">
        <DialogTitle>{titleDialogContent}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DialogCustomAdmin
