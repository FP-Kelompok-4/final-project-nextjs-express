import { Button } from '@/components/ui/button';
import { formatCurrencyRp } from '@/lib/formatNumber';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { addDays, format, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, Loader2Icon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form';
import { BookingDateRangeSchema } from '@/schemas/transaction-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addBookingClientThunk,
  checkBookingClientThunk,
} from '@/redux/slices/client/transaction-thunk';
import { useSession } from 'next-auth/react';
import { TOrderData } from '@/redux/slices/client/transaction-slice';
import { useToast } from '@/components/ui/use-toast';
import { countDaysInRange } from '@/lib/countDaysInRange';
import { useRouter } from 'next/navigation';

const BookingFloating = ({
  pId,
  totalPay,
  orderList,
}: {
  pId: string;
  totalPay: number;
  orderList: {
    id: string;
    type: string;
    price: number;
    quantity: number;
    amount: number;
  }[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [daysBooking, setDaysBooking] = useState(0);

  const { toast } = useToast();

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const {
    isLoadingAddBooking,
    orderList: orderListState,
    preOrderList,
  } = useAppSelector((state) => state.transactionClientReducer);

  const form = useForm<z.infer<typeof BookingDateRangeSchema>>({
    resolver: zodResolver(BookingDateRangeSchema),
  });

  const onSubmit = (values: z.infer<typeof BookingDateRangeSchema>) => {
    console.log(values);

    const days = countDaysInRange(values.dateRange.from, values.dateRange.to);

    setDaysBooking(days);

    if (session && session.user.role === 'USER') {
      dispatch(
        checkBookingClientThunk({
          userId: session.user.id,
          pId,
          checkIn: new Date(form.getValues().dateRange.from),
          checkOut: new Date(form.getValues().dateRange.to),
          rooms: orderList.map(({ id: roomId, type, quantity }) => {
            return {
              roomId,
              quantity,
              type,
            };
          }),
          token: session.user.accessToken!,
        }),
      ).then((data: any) => {
        const result = data.payload.data;

        toast({
          variant: data.payload.error ? 'destructive' : 'default',
          title: data.payload.error
            ? JSON.stringify(data.payload.error)
            : 'Success Check Order',
        });

        if (!data.payload.error) {
          onHandleDialogOpen(true);

          // onHandleDialogOpen(false);
        }
      });
    } else {
      router.push('/signin');
    }
  };

  const onHandleDialogOpen = (open: boolean) => setIsDialogOpen(open);

  return (
    <div className="fixed bottom-0 left-1/2 z-50 flex w-screen -translate-x-1/2 flex-col justify-between gap-2 border-t-[1px] bg-white px-8 py-5 shadow-xl drop-shadow-xl sm:bottom-4 sm:w-fit sm:flex-row sm:gap-10 sm:rounded-full sm:px-3 sm:py-3">
      <div className="flex h-full flex-col gap-4 sm:flex-row sm:gap-8 sm:pl-8">
        <div className="flex h-full flex-col">
          <p className="text-athens-gray-500 text-sm font-semibold">Total</p>
          <p className="text-2xl font-bold">{formatCurrencyRp(totalPay)}</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                          'hover:bg-athens-gray-100 flex h-fit min-w-72 items-center justify-center rounded-full bg-transparent px-9 py-4 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, 'LLL dd, y')} -{' '}
                              {format(field.value.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={(range) => field.onChange(range)}
                        numberOfMonths={2}
                        disabled={(date) => {
                          const today = new Date();
                          return date < addDays(today, 1);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-gossamer-500 hover:bg-gossamer-500/90 h-fit rounded-full px-10 py-4 text-base sm:text-xl"
              //   onClick={() => {
              //     form.handleSubmit(onSubmit);
              //   }}
            >
              Booking
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={onHandleDialogOpen}>
        {/* <DialogTrigger asChild>
          
        </DialogTrigger> */}
        <DialogContent className="flex flex-col gap-6 sm:max-w-[600px]">
          {isLoadingAddBooking ? (
            <div className="flex h-52 items-center justify-center">
              <Loader2Icon size={24} className="animate-spin" />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Konfirmasi</DialogTitle>
              </DialogHeader>

              <DialogDescription className="flex flex-col gap-1">
                <p className="flex gap-2">
                  <p className="text-athens-gray-950 w-20 font-semibold">
                    Check In
                  </p>
                  : {new Date(form.getValues().dateRange.from).toDateString()}{' '}
                </p>
                <p className="flex gap-2">
                  <p className="text-athens-gray-950 w-20 font-semibold">
                    Check Out
                  </p>
                  : {new Date(form.getValues().dateRange.to).toDateString()}
                </p>
              </DialogDescription>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  {preOrderList &&
                    preOrderList.line_items.map(
                      (
                        {
                          id,
                          name,
                          specialPrice,
                          originalPrice,
                          quantity,
                          price,
                        },
                        index,
                      ) => (
                        <div
                          key={`${id}-${index}`}
                          className="flex items-center justify-between rounded-md border-[1px] px-4 py-2"
                        >
                          <p className="text-xs font-semibold">{name}</p>
                          <div className="flex items-center gap-1">
                            <p
                              className={cn(
                                'inline-flex gap-2 text-xs font-semibold',
                              )}
                            >
                              {specialPrice && (
                                <span
                                  className={cn(
                                    'text-athens-gray-400',
                                    specialPrice && 'line-through',
                                  )}
                                >
                                  {formatCurrencyRp(originalPrice)}
                                </span>
                              )}
                              <span className="text-athens-gray-950">
                                {formatCurrencyRp(
                                  specialPrice ?? originalPrice,
                                )}
                              </span>
                            </p>
                            <p className="text-athens-gray-400 text-xs font-semibold">
                              x {quantity} kamar
                            </p>
                            <p className="text-athens-gray-400 text-xs font-semibold">
                              x {daysBooking} hari
                            </p>
                            <p className="text-athens-gray-400 text-xs font-semibold">
                              :
                            </p>
                            <p className="text-sm font-semibold">
                              {formatCurrencyRp(price)}
                            </p>
                          </div>
                        </div>
                      ),
                    )}

                  <Separator orientation="horizontal" />

                  <div className="flex items-center justify-end gap-1">
                    <p className="text-lg font-bold">
                      {formatCurrencyRp(
                        preOrderList ? preOrderList.totalAmount : 0,
                      )}
                    </p>
                  </div>
                </div>

                {/* <div className="flex flex-col gap-1">
                  {orderList.map(
                    ({ id, type, price, quantity, amount }, index) => (
                      <div
                        key={`${id}-${index}`}
                        className="flex items-center justify-between rounded-md border-[1px] px-4 py-2"
                      >
                        <p className="text-xs font-semibold">{type}</p>
                        <div className="flex items-center gap-1">
                          <p className="text-athens-gray-400 text-xs font-semibold">
                            {formatCurrencyRp(price)}
                          </p>
                          <p className="text-athens-gray-400 text-xs font-semibold">
                            x
                          </p>
                          <p className="text-athens-gray-400 text-xs font-semibold">
                            {quantity}
                          </p>
                          <p className="text-athens-gray-400 text-xs font-semibold">
                            :
                          </p>
                          <p className="text-sm font-semibold">
                            {formatCurrencyRp(amount)}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
                <div className="flex w-full flex-col items-end justify-end gap-2 pr-4">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold">{daysBooking} days</p>
                    <p className="text-athens-gray-400 text-xs font-semibold">
                      x
                    </p>
                    <p className="text-sm font-semibold">
                      {formatCurrencyRp(totalPay)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <p className="text-lg font-bold">
                      {formatCurrencyRp(totalPay * daysBooking)}
                    </p>
                  </div>
                </div> */}
              </div>

              <DialogFooter>
                <DialogClose>
                  <Button variant={'ghost'}>Batal</Button>
                </DialogClose>
                <Button
                  onClick={() => {
                    session &&
                      dispatch(
                        addBookingClientThunk({
                          userId: session.user.id,
                          pId,
                          checkIn: new Date(form.getValues().dateRange.from),
                          checkOut: new Date(form.getValues().dateRange.to),
                          rooms: orderList.map(
                            ({ id: roomId, type, quantity }) => {
                              return {
                                roomId,
                                quantity,
                                type,
                              };
                            },
                          ),
                          token: session.user.accessToken!,
                        }),
                      ).then((data: any) => {
                        const result = data.payload.data;

                        toast({
                          variant: data.payload.error
                            ? 'destructive'
                            : 'default',
                          title: data.payload.error
                            ? JSON.stringify(data.payload.error)
                            : 'Success Check Order',
                        });

                        if (!data.payload.error) {
                          router.push('/order');

                          onHandleDialogOpen(false);
                        }
                      });
                  }}
                >
                  Bayar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingFloating;
