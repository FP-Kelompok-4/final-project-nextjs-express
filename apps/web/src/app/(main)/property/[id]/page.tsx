'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getPropertyDetailClientThunk } from '@/redux/slices/client/property-thunk';
import { formatCurrencyRp } from '@/lib/formatNumber';
import { useSession } from 'next-auth/react';
import RoomCard from './_components/Room-Card';
import BookingFloating from './_components/Booking-Floating';
import { useRouter } from 'next/navigation';

const DetailPage = ({ params }: { params: { id: string } }) => {
  const { data: session, update } = useSession();

  const [orderList, setOrderList] = useState<
    {
      id: string;
      type: string;
      price: number;
      quantity: number;
      amount: number;
    }[]
  >([]);

  const [totalPay, setTotalPay] = useState(0);

  const swiperRef = useRef<any>(null);
  const router = useRouter();

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const dispatch = useAppDispatch();
  const { properyDetail, isPropertyDetailLoading } = useAppSelector(
    (state) => state.propertiesClientSlice,
  );

  useEffect(() => {
    dispatch(getPropertyDetailClientThunk({ id: params.id }));
  }, [params]);

  const handleRoomCardChange = ({
    id,
    amount,
    quantity,
    type,
    price,
  }: {
    id: string;
    type: string;
    price: number;
    amount: number;
    quantity: number;
  }) => {
    const existingIndex = orderList.findIndex((item) => item.id === id);

    if (quantity === 0 && amount === 0 && existingIndex !== -1) {
      const updatedOrderList = [...orderList];

      updatedOrderList.splice(existingIndex, 1);

      setOrderList(updatedOrderList);
    } else if (existingIndex !== -1) {
      const updatedOrderList = [...orderList];

      updatedOrderList[existingIndex] = { id, amount, quantity, type, price };

      setOrderList(updatedOrderList);
    } else if (quantity > 0) {
      setOrderList((prev) => [...prev, { id, amount, quantity, type, price }]);
    }
  };

  useEffect(() => {
    let newTotalPay = 0;

    for (const { amount } of orderList) {
      newTotalPay += amount;
    }
    setTotalPay(newTotalPay);
  }, [orderList]);

  if (session?.user.role === 'TENANT') {
    return router.replace('/');
  }

  return (
    <main className="mt-[78px] flex min-h-svh flex-col gap-6 py-5 pb-24 sm:pb-5">
      {properyDetail ? (
        <>
          <div className="px-6 md:px-10 xl:px-20">
            <div className="relative flex h-80 w-full flex-col gap-5 overflow-hidden rounded-xl md:h-96 md:gap-14">
              <Image
                className="-z-10 h-full w-full object-cover object-center brightness-75"
                src={`http://localhost:8000/properties/${properyDetail.image}`}
                fill
                priority
                alt="hero"
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 px-6 md:px-10 xl:px-20">
            <p className="text-athens-gray-950 w-fit text-wrap text-3xl font-bold tracking-tight md:text-center">
              {properyDetail.name}
            </p>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-row items-center gap-3">
                <div className="bg-athens-gray-950 rounded-full px-6 py-2 text-white">
                  {properyDetail.category}
                </div>
                <div className="border-athens-gray-950 text-athens-gray-950 rounded-full border-[1px] px-6 py-2">
                  {properyDetail.location}
                </div>
              </div>

              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center gap-2">
                  <Star size={16} /> <span>4</span>
                </div>
                <span>(12 review)</span>
              </div>
            </div>
            <Separator orientation="horizontal" />

            <div className="flex flex-row gap-3">
              <p className="text-athens-gray-500 text-wrap text-lg font-normal tracking-tight md:text-center">
                {properyDetail.description}
              </p>
            </div>

            <Separator orientation="horizontal" />
          </div>

          <div className="flex flex-col gap-6 px-6 md:px-10 xl:px-20">
            <div className="flex w-full flex-col gap-4">
              <p className="text-athens-gray-800 text-2xl font-bold tracking-tight">
                Rooms
              </p>
            </div>
            <div className="group/navigation relative">
              <Swiper
                className="!h-full !w-full rounded-xl"
                ref={swiperRef}
                spaceBetween={16}
                slidesPerView={'auto'}
                centeredSlidesBounds
                centeredSlides
                modules={[Navigation]}
                onSlideChange={() => {}}
                onSwiper={(swiper) => {}}
              >
                {properyDetail.rooms &&
                  properyDetail.rooms.map(
                    (
                      { id, type, description, roomPrice: price, image },
                      index,
                    ) => (
                      <SwiperSlide
                        key={`${id}-${index}`}
                        className={cn(
                          '!flex !w-[50%] items-center justify-center',
                        )}
                      >
                        <RoomCard
                          id={id}
                          type={type}
                          description={description}
                          price={price}
                          image={image}
                          onChange={({ amount, quantity }) => {
                            handleRoomCardChange({
                              id,
                              amount,
                              quantity,
                              type,
                              price,
                            });
                          }}
                        />
                      </SwiperSlide>
                    ),
                  )}
              </Swiper>
              <div className="absolute -left-6 top-1/2 z-20 -translate-y-1/2 opacity-0 transition-all ease-in-out group-hover/navigation:opacity-100">
                <Button
                  className="z-10 aspect-square w-fit rounded-full p-0"
                  onClick={() => handlePrev()}
                >
                  <ArrowLeft size={16} />
                </Button>
              </div>
              <div className="absolute -right-6 top-1/2 z-20 -translate-y-1/2 opacity-0 transition-all ease-in-out group-hover/navigation:opacity-100">
                <Button
                  className="z-10 aspect-square w-fit rounded-full p-0"
                  onClick={() => handleNext()}
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
          {orderList.length > 0 && (
            <BookingFloating
              totalPay={totalPay}
              orderList={orderList}
              pId={params.id}
            />
          )}
        </>
      ) : (
        <div className="flex min-h-[calc(100svh-79px)] w-full items-center justify-center">
          <h2 className="text-xl font-semibold">Opps. Property not found.</h2>
        </div>
      )}
    </main>
  );
};

export default DetailPage;
