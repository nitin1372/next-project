"use client";

import Image from "next/image";
import Link from "next/link";
import brands, { allProducts } from "@/data/brands";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const productById = new Map(allProducts.map((product) => [product.id, product]));
const brandLabelBySlug = new Map(brands.map((brand) => [brand.slug, brand.label]));

const getProductImage = (product) =>
  product.images?.[0] || product.image || "/logo1.png";

const getProductPrice = (product) => product.variants?.[0]?.price ?? product.price;

export default function ProductSectionSlider({
  title,
  productIds,
  imageOnly = false,
}) {
  const products = productIds
    .map((id) => productById.get(id))
    .filter(Boolean);

  if (!products.length) {
    return null;
  }

  return (
    <div className="container px-4 py-5">
      <h2 className="mb-7 text-2xl font-bold text-slate-900 md:text-3xl">
        {title}
      </h2>

      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        freeMode
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="h-auto pb-10">
            <Link
              href={`/product/${product.brand}?product=${product.id}`}
              className="group block h-full"
            >
              {imageOnly ? (
                <article className="flex h-full items-center justify-center p-4">
                  <Image
                    src={getProductImage(product)}
                    alt={product.name}
                    width={220}
                    height={220}
                    className="h-auto w-[120px] object-contain transition duration-300 group-hover:scale-105 sm:w-[150px] md:w-[170px] lg:w-[190px]"
                  />
                </article>
              ) : (
                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex min-h-[180px] items-center justify-center rounded-xl bg-slate-50 p-4">
                    <Image
                      src={getProductImage(product)}
                      alt={product.name}
                      width={220}
                      height={220}
                      className="h-auto max-h-[160px] w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex flex-1 flex-col">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {brandLabelBySlug.get(product.brand) || product.brand}
                    </p>
                    <h3 className="mt-1 min-h-[48px] text-sm font-semibold text-slate-900 sm:text-base">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      {product.description?.[0] || "Popular smartphone deal"}
                    </p>
                    <p className="mt-4 text-base font-bold text-slate-900">
                      Rs. {getProductPrice(product)}
                    </p>
                  </div>
                </article>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
