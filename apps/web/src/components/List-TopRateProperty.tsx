'use client';

import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Button } from './ui/button';

const ListTopRateProperty = () => {
  const ListSlide = ['1', '2', '3', '4', '5'];

  ListSlide.concat(ListSlide).concat(ListSlide).concat(ListSlide);

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

  return (
    <div className="flex flex-col gap-6 px-6 md:px-10 xl:px-20">
      <div className="flex w-full flex-col gap-4">
        <p className="text-athens-gray-950 text-3xl font-semibold tracking-tight">
          Top Rate Property
        </p>
        <p className="text-athens-gray-950/90 w-full tracking-tight md:w-[480px]">
          Temukan pilihan hotel terbaik pilihan kami, berdasarkan masukan dari
          pengunjung kami yang senang
        </p>
      </div>
      <div className="group/navigation relative">
        <Swiper
          className="!h-full !w-full rounded-xl"
          ref={swiperRef}
          spaceBetween={16}
          slidesPerView={'auto'}
          centeredSlidesBounds
          loopPreventsSliding
          centeredSlides
          loop
          lazyPreloadPrevNext={3}
          modules={[Navigation]}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
        >
          {ListSlide.map((data, index) => (
            <SwiperSlide
              key={`${data}-${index}`}
              className={cn('!flex !w-[50%] items-center justify-center')}
            >
              <div className="relative h-80 w-full overflow-hidden rounded-xl opacity-75 transition-all duration-500 ease-in-out [.swiper-slide-active_&]:opacity-100">
                <Image
                  className="-z-10 h-full w-full rounded-xl object-cover object-center brightness-75"
                  src={'/hero.jpg'}
                  fill
                  sizes="100%"
                  alt={`slide-${index}`}
                />
                <div className="flex h-full w-full flex-col justify-end gap-2 px-6 pb-6 opacity-0 [.swiper-slide-active__&]:opacity-100">
                  <p className="text-xl tracking-tight text-white md:text-2xl">
                    Grand Mega Hotel
                  </p>
                  <div className="flex flex-col gap-1 text-sm text-white md:flex-row md:items-center md:gap-4 md:text-base">
                    <span>Denpasar</span>
                    <div className="flex items-center gap-2">
                      <Star size={16} /> <span>4</span>
                    </div>
                    <span>(12 review)</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
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
  );
};

export default ListTopRateProperty;
