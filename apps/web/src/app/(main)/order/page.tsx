'use client';

import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  getBookingsClientThunk,
  updateBookingsClientThunk,
} from '@/redux/slices/client/transaction-thunk';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CountDown from './_components/Count-Down';
import { formatCurrencyRp } from '@/lib/formatNumber';
import { countDaysInRange } from '@/lib/countDaysInRange';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

const OrderPage = () => {
  const { data: session, update } = useSession();

  const dispatch = useAppDispatch();

  const { isLoadingGetBookings, orderList } = useAppSelector(
    (state) => state.transactionClientReducer,
  );

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const haldleIsDialogOpen = (open: boolean) => {
    setIsOpenDialog(open);
  };

  useEffect(() => {
    if (session && isLoadingGetBookings) {
      dispatch(
        getBookingsClientThunk({
          userId: session.user.id,
          token: session.user.accessToken!,
        }),
      );
    }
  }, [session, isLoadingGetBookings]);

  return (
    <main className="min-h-svh w-full pt-[78px]">
      {/* {JSON.stringify(orderList)} */}
      <div className="my-6 flex w-full flex-col items-center gap-3 px-6 md:px-10 xl:px-20">
        {orderList.length > 0 ? (
          orderList.map(
            (
              {
                id,
                orderProperty,
                status,
                expDateTime,
                totalPayment,
                checkIn,
                checkOut,
                orderRooms,
                urlPayment,
                invoiceId,
              },
              index,
            ) => (
              <div
                key={`${id}-${index}`}
                className="flex w-fit min-w-full flex-col gap-2 rounded-lg border-[1px] px-4 py-2 sm:min-w-[550px]"
              >
                <div className="flex w-full items-center justify-between">
                  <p>{orderProperty.name}</p>
                  <p className="text-xs tracking-tighter">
                    ({countDaysInRange(new Date(checkIn), new Date(checkOut))}{' '}
                    days) {new Date(checkIn).toDateString()} -{' '}
                    {new Date(checkOut).toDateString()}
                  </p>
                </div>
                <p className="text-athens-gray-500 flex gap-2 text-sm font-semibold">
                  {orderRooms.map(({ id: idA, quantity, type }, indexA) => (
                    <span key={`${idA}-${indexA}`}>
                      {quantity} kamar {type},
                    </span>
                  ))}
                </p>
                <p className="text-sm font-semibold">
                  {formatCurrencyRp(totalPayment)}
                </p>

                <div className="flex w-full justify-end">
                  <div
                    className={cn(
                      'flex w-full items-center justify-center rounded-xl border-[1px] px-4 py-2',
                      status === 'pending' && new Date(expDateTime) < new Date()
                        ? 'border-red-700 text-red-700'
                        : 'border-gossamer-600 text-gossamer-600',
                      'text-sm font-bold',
                    )}
                  >
                    {status === 'pending' &&
                    new Date(expDateTime) < new Date() ? (
                      'Expired'
                    ) : status === 'finished' ? (
                      'Finished'
                    ) : (
                      <div className="flex flex-col gap-3 items-center">
                        <p>Waiting for Payment</p>
                        <CountDown dateAt={new Date(expDateTime)} />
                      </div>
                    )}
                  </div>
                </div>

                {status === 'pending' && new Date(expDateTime) > new Date() && (
                  <>
                    <div className="flex w-full justify-end">
                      <Button
                        className={cn(
                          'flex w-full items-center justify-center rounded-xl border-[1px] px-4 py-2',
                          'bg-red-600 text-white hover:bg-red-600/90',
                          'text-sm font-bold',
                        )}
                      >
                        Cancel Payment
                      </Button>
                    </div>
                    <div className="flex w-full justify-end">
                      <Button
                        className={cn(
                          'flex w-full items-center justify-center rounded-xl border-[1px] px-4 py-2',
                          'bg-gossamer-600 hover:bg-gossamer-600/90 text-white',
                          'text-sm font-bold',
                        )}
                        onClick={() => {
                          session &&
                            dispatch(
                              updateBookingsClientThunk({
                                userId: session.user.id,
                                invoiceId,
                                token: session.user.accessToken!,
                              }),
                            );
                        }}
                      >
                        Check Payment Status
                      </Button>
                    </div>
                    <div className="flex w-full justify-end">
                      <Dialog
                        open={isOpenDialog}
                        onOpenChange={haldleIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className={cn(
                              'flex w-full items-center justify-center rounded-xl border-[1px] px-4 py-2',
                              'bg-gossamer-600 hover:bg-gossamer-600/90 text-white',
                              'text-sm font-bold',
                            )}
                          >
                            Link Payment
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          onInteractOutside={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <iframe
                            className="h-[500px] w-full"
                            src={urlPayment}
                          ></iframe>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </div>
            ),
          )
        ) : (
          <div className="flex min-h-[calc(100svh-79px)] w-full items-center justify-center">
            <h2 className="text-xl font-semibold">Opps. Order not found.</h2>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderPage;
