'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getPropertyDetailClientThunk } from '@/redux/slices/client/property-thunk';
import { formatCurrencyRp } from '@/lib/formatNumber';

const DetailPage = ({ params }: { params: { id: string } }) => {
  // const ListSlide = ['1', '2', '3', '4', '5'];

  const swiperRef = useRef<any>(null);

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

  // getPropertyDetailClientThunk
  const dispatch = useAppDispatch();

  const { properyDetail, isPropertyDetailLoading } = useAppSelector(
    (state) => state.propertiesClientSlice,
  );

  useEffect(() => {
    dispatch(getPropertyDetailClientThunk({ id: params.id }));
  }, [params]);

  return (
    <main className="mt-[78px] flex min-h-svh flex-col gap-6 py-5">
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

            <div className="flex flex-row items-center gap-3">
              <div className="bg-athens-gray-950 rounded-full px-6 py-2 text-white">
                {properyDetail.category}
              </div>
              <div className="border-athens-gray-950 text-athens-gray-950 rounded-full border-[1px] px-6 py-2">
                {properyDetail.location}
              </div>

              <div className="flex items-center gap-2">
                <Star size={16} /> <span>4</span>
              </div>
              <span>(12 review)</span>
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
                    ({ id, type, description, price, image }, index) => (
                      <SwiperSlide
                        key={`${id}-${index}`}
                        className={cn(
                          '!flex !w-[50%] items-center justify-center',
                        )}
                      >
                        <div className="relative h-80 w-full overflow-hidden rounded-xl opacity-50 transition-all duration-500 ease-in-out [.swiper-slide-active_&]:opacity-100">
                          <Image
                            className="-z-10 h-full w-full rounded-xl object-cover object-center brightness-75"
                            src={`http://localhost:8000/rooms/${image}`}
                            fill
                            sizes="100%"
                            alt={`slide-${index}`}
                          />
                          <div className="relative flex h-full w-full flex-row items-end p-6 opacity-0 transition-all [.swiper-slide-active__&]:opacity-100">
                            <div className="flex h-full w-full flex-col justify-end gap-2">
                              <p className="text-xl font-bold tracking-tight text-white md:text-2xl">
                                Room {type}
                              </p>
                              <p className="text-white/80">{description}</p>

                              <div className="flex flex-col gap-1 text-base font-semibold text-white md:flex-row md:items-center md:gap-4 md:text-base">
                                <span>{formatCurrencyRp(price)}</span>
                              </div>
                            </div>
                            <Button className="bg-gossamer-500 hover:bg-gossamer-500/90 rounded-full">
                              Order
                            </Button>
                          </div>
                        </div>
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
