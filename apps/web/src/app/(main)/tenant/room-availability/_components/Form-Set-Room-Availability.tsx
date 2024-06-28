import React from 'react'
import { FromRoomAvailabilityPriceSchema } from "@/schemas/form-room-availability-price-schema";
import { UseFormReturn } from "react-hook-form";
import z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select"

const FormSetRoomAvailability = ({
  form,
  handleOpenDialogSetAvailability,
  modalPopover
}: {
  form: UseFormReturn<z.infer<typeof FromRoomAvailabilityPriceSchema>, any, undefined>
  handleOpenDialogSetAvailability: (open: boolean) => void,
  modalPopover: boolean
}) => {
  const onSubmit = (values: z.infer<typeof FromRoomAvailabilityPriceSchema>) => {
    console.log(values)
    handleOpenDialogSetAvailability(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="id"
          render={({field}) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Property 1</SelectLabel>
                    <SelectItem value="Room 1 Property 1">Room 1 Property 1</SelectItem>
                    <SelectItem value="Room 2 Property 1">Room 2 Property 1</SelectItem>
                    <SelectItem value="Room 3 Property 1">Room 3 Property 1</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Property 2</SelectLabel>
                    <SelectItem value="Room 1 Property 2">Room 1 Property 2</SelectItem>
                    <SelectItem value="Room 2 Property 2">Room 2 Property 2</SelectItem>
                    <SelectItem value="Room 3 Property 3">Room 3 Property 3</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fromDate"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>From Date</FormLabel>
              <Popover modal={modalPopover}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent avoidCollisions={true} className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      // ["2024-06-29", "2024-06-30"].includes(format(date, "yyyy-MM-dd"))
                      if (format(date, "yyyy-MM-dd") == format("2024-07-29T00:00:00.000Z", "yyyy-MM-dd")) return true
                      if (date < addDays(new Date(), 1)) return true;
                      return false;
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="toDate"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>To Date</FormLabel>
              <Popover modal={modalPopover}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent avoidCollisions={true} className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      // ["2024-06-29", "2024-06-30"].includes(format(date, "yyyy-MM-dd"))
                      if (format(date, "yyyy-MM-dd") == format("2024-07-29T00:00:00.000Z", "yyyy-MM-dd")) return true
                      if (date < addDays(new Date(), 1)) return true;
                      return false;
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button aria-label="Close" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default FormSetRoomAvailability