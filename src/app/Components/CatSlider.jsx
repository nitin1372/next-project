"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid } from "swiper/modules";
import brands from "@/data/brands";
import "swiper/css";
import "swiper/css/grid";

const CatSlider = () => {
  return (
    <div className="py-4 flex items-center justify-center">
      <div className="container">
        <Swiper
          slidesPerView={3}
          spaceBetween={12}
          modules={[Grid]}
          grid={{
            rows: 5,
            fill: "row",
          }}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 12,
              grid: { rows: 5, fill: "row" },
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 14,
              grid: { rows: 4, fill: "row" },
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 16,
              grid: { rows: 4, fill: "row" },
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 18,
              grid: { rows: 3, fill: "row" },
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
              grid: { rows: 2, fill: "row" },
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 20,
              grid: { rows: 2, fill: "row" },
            },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.slug}>
              <Link href={`/product/${brand.slug}`} className="block ">
                <div className="rounded-md bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex min-h-[92px] items-center justify-center p-3 sm:min-h-[110px]">
                    <img
                      src={brand.image}
                      alt={brand.label}
                      className="mx-auto h-auto w-[56px] object-contain sm:w-[80px] md:w-[100px]"
                    />
                  </div>
                </div>
                <div className="mt-2 truncate  text-center text-[10px] font-semibold sm:text-[12px] md:text-[14px]">
                  {brand.label}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CatSlider;
