"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBolt,
  FaCheckCircle,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPercent,
  FaShieldAlt,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaTag,
  FaTruck,
} from "react-icons/fa";
import brands, { allProducts } from "@/data/brands";
import { getProductGallery } from "@/lib/productGallery";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../context/cartContext.js";

const formatPrice = (value) => `Rs. ${new Intl.NumberFormat("en-IN").format(value)}`;
const formatCount = (value) => new Intl.NumberFormat("en-IN").format(value || 0);

const getListingPrice = (product) => product.variants?.[0]?.price ?? product.price;
const getListingOriginalPrice = (product) =>
  product.variants?.[0]?.originalPrice ?? product.originalPrice ?? getListingPrice(product);

const getVariantLabel = (variant) => {
  const parts = [variant?.storage, variant?.ram].filter(Boolean);
  return parts.length > 0 ? parts.join(" | ") : "Standard Variant";
};

const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

export default function BrandPage() {
  const { brand } = useParams();
  const searchParams = useSearchParams();
  const brandInfo = brands.find((item) => item.slug === brand);
  const brandLabel = brandInfo?.label || brand;
  const selectedProductId = searchParams.get("product");
  const brandProducts = allProducts.filter(
    (item) => item.brand.toLowerCase() === brand.toLowerCase()
  );
  const filteredProducts = selectedProductId
    ? brandProducts.filter((item) => String(item.id) === selectedProductId)
    : brandProducts;
  const visibleProducts =
    filteredProducts.length > 0 ? filteredProducts : brandProducts;
  const isFocusedView =
    Boolean(selectedProductId) && visibleProducts.length === 1;
  const otherBrandModels =
    isFocusedView && selectedProductId
      ? brandProducts.filter((item) => String(item.id) !== selectedProductId)
      : [];

  if (visibleProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#f1f3f6] px-4 py-6 md:px-8">
        <div className="mx-auto max-w-7xl rounded-sm bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-base text-slate-600">
            No products found for this brand.
          </p>
        </div>
      </div>
    );
  }

  if (isFocusedView) {
    const selectedProduct = visibleProducts[0];

    return (
      <div className="min-h-screen bg-[#f1f3f6] px-2 py-4 sm:px-4 sm:py-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">
            <Link href="/" className="transition hover:text-[#2874f0]">
              Home
            </Link>
            <FaChevronRight className="text-[10px]" />
            <Link
              href={`/product/${brand}`}
              className="transition hover:text-[#2874f0]"
            >
              {brandLabel} Mobiles
            </Link>
            <FaChevronRight className="text-[10px]" />
            <span className="font-medium text-slate-700">{selectedProduct.name}</span>
          </div>

          <ProductDetailView
            key={selectedProduct.id}
            item={selectedProduct}
            brandSlug={brand}
            brandLabel={brandLabel}
            otherBrandModels={otherBrandModels}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] px-2 py-4 sm:px-4 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <section className="rounded-sm bg-white px-5 py-5 shadow-sm sm:px-6">
          <p className="text-sm font-medium text-[#2874f0]">{brandLabel} Store</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
            {brandLabel} Mobiles
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Explore {brandProducts.length} smartphones from {brandLabel} with
            price, offers and detailed highlights.
          </p>
        </section>

        <section className="overflow-hidden rounded-sm bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <p className="text-sm font-medium text-slate-700">
              Showing {brandProducts.length} results
            </p>
          </div>

          <div>
            {brandProducts.map((item) => (
              <BrandListCard
                key={item.id}
                item={item}
                brandLabel={brandLabel}
                brandSlug={brand}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function BrandListCard({ item, brandLabel, brandSlug }) {
  const price = getListingPrice(item);
  const originalPrice = getListingOriginalPrice(item);

  return (
    <Link
      href={`/product/${brandSlug}?product=${item.id}`}
      className="group block border-b border-slate-200 last:border-b-0"
    >
      <article className="grid gap-5 px-4 py-6 transition hover:bg-slate-50 sm:px-6 md:grid-cols-[180px_minmax(0,1fr)_190px] md:items-start">
        <div className="flex items-center justify-center">
          <Image
            src={item.images?.[0] || item.image || "/logo1.png"}
            alt={item.name}
            width={220}
            height={220}
            className="h-auto max-h-[180px] w-auto object-contain"
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-medium text-slate-800 transition group-hover:text-[#2874f0]">
            {item.name}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 rounded bg-[#388e3c] px-2 py-1 text-xs font-semibold text-white">
              {item.rating}
              <FaStar className="text-[10px]" />
            </span>
            <span className="font-medium text-slate-500">
              {formatCount(item.reviews)} Ratings & Reviews
            </span>
          </div>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            {item.description?.slice(0, 4).map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-left">
          <p className="text-[28px] font-semibold leading-none text-slate-900">
            {formatPrice(price)}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-slate-400 line-through">
              {formatPrice(originalPrice)}
            </span>
            <span className="font-semibold text-[#388e3c]">
              {item.discount}% off
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-green-600">
            Free delivery by {getDeliveryDate()}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Save extra with bank and exchange offers
          </p>
          <p className="mt-4 text-sm font-semibold text-[#2874f0]">
            View details
          </p>
        </div>
      </article>
    </Link>
  );
}

function ProductDetailView({ item, brandSlug, brandLabel, otherBrandModels }) {
  const router = useRouter();
  const { addToCart, setBuyNowItem } = useCart();
  const images = getProductGallery(item);
  const variants =
    item.variants?.length
      ? item.variants
      : [
          {
            ram: null,
            storage: null,
            price: item.price,
            originalPrice: item.originalPrice ?? item.price,
            inStock: true,
          },
        ];
  const hasVariants = item.variants?.length > 0;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [variant, setVariant] = useState(variants[0]);
  const selectedImage = images[selectedImageIndex];

  const offerLines = [
    `Bank Offer 5% Cashback on select bank cards`,
    `Special Price Get extra ${item.discount}% off on this product`,
    `No cost EMI available on eligible cards`,
    `Exchange Offer Save more when you exchange your old phone`,
  ];

  const productHighlights = item.description?.length
    ? item.description
    : ["Reliable performance", "Premium design", "Value packed smartphone"];

  const specifications = [
    { label: "Brand", value: brandLabel },
    { label: "Model Name", value: item.name },
    { label: "Storage", value: variant.storage || "Standard" },
    { label: "RAM", value: variant.ram || "Standard" },
    { label: "Ratings", value: `${item.rating} / 5 (${formatCount(item.reviews)} reviews)` },
    {
      label: "In The Box",
      value: "Handset, Charger, USB Cable, SIM Eject Tool and User Guide",
    },
  ];

  const serviceHighlights = [
    {
      icon: FaTruck,
      title: "Free Delivery",
      description: `Delivery by ${getDeliveryDate()}`,
    },
    {
      icon: FaCheckCircle,
      title: "7 Days Replacement",
      description: "Easy replacement for manufacturing defects",
    },
    {
      icon: FaShieldAlt,
      title: "1 Year Warranty",
      description: "Brand warranty for phone and 6 months for accessories",
    },
  ];

  const createCheckoutItem = () => ({
    id: `${item.id}-${variant.storage || "standard"}-${variant.ram || "base"}`,
    name: item.name,
    image: selectedImage,
    price: variant.price,
    qty: 1,
    brand: item.brand,
    storage: variant.storage,
    ram: variant.ram,
  });

  const handleAddToCart = () => {
    addToCart(createCheckoutItem());
  };

  const handleBuyNow = () => {
    setBuyNowItem(createCheckoutItem());
    router.push("/checkout?mode=buy-now");
  };

  return (
    <div className="space-y-4">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)_300px]">
        <div className="xl:sticky xl:top-24 xl:self-start">
          <div className="rounded-sm bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="order-2 flex gap-2 sm:order-1 sm:w-[72px] sm:flex-col">
                {images.map((image, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`overflow-hidden rounded-sm border p-1 transition ${
                      selectedImageIndex === index
                        ? "border-[#2874f0]"
                        : "border-slate-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${item.name} preview ${index + 1}`}
                      width={64}
                      height={64}
                      className="h-14 w-14 object-contain"
                    />
                  </button>
                ))}
              </div>

              <div className="order-1 flex min-h-[320px] flex-1 items-center justify-center rounded-sm border border-slate-200 bg-white p-4 sm:min-h-[420px]">
                <Image
                  src={selectedImage}
                  alt={item.name}
                  width={420}
                  height={420}
                  priority
                  className="h-auto max-h-[380px] w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff9f00] px-4 py-4 text-sm font-semibold uppercase tracking-wide text-white"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#fb641b] px-4 py-4 text-sm font-semibold uppercase tracking-wide text-white"
            >
              <FaBolt />
              Buy Now
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-sm bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-medium text-slate-500">{brandLabel}</p>
            <h1 className="mt-2 text-xl font-medium leading-8 text-slate-900 sm:text-2xl">
              {item.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 rounded bg-[#388e3c] px-2 py-1 text-xs font-semibold text-white">
                {item.rating}
                <FaStar className="text-[10px]" />
              </span>
              <span className="font-medium text-slate-500">
                {formatCount(item.reviews)} Ratings & Reviews
              </span>
              <span className="inline-flex items-center gap-2 font-medium text-[#2874f0]">
                <FaPercent className="text-xs" />
                Top deal
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-[#388e3c]">Special price</p>
              <div className="mt-1 flex flex-wrap items-end gap-3">
                <span className="text-3xl font-semibold text-slate-900">
                  {formatPrice(variant.price)}
                </span>
                <span className="text-base text-slate-400 line-through">
                  {formatPrice(variant.originalPrice)}
                </span>
                <span className="text-base font-semibold text-[#388e3c]">
                  {item.discount}% off
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Inclusive of all taxes
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-base font-semibold text-slate-900">
                Available offers
              </h2>

              <div className="mt-3 space-y-3">
                {offerLines.map((offer) => (
                  <div key={offer} className="flex gap-3 text-sm text-slate-700">
                    <FaTag className="mt-1 shrink-0 text-[#26a541]" />
                    <p>{offer}</p>
                  </div>
                ))}
              </div>
            </div>

            {hasVariants && (
              <div className="mt-6 border-t border-slate-200 pt-6">
                <h2 className="text-base font-semibold text-slate-900">
                  Available variants
                </h2>

                <div className="mt-3 flex flex-wrap gap-3">
                  {variants.map((value) => {
                    const isSelected =
                      value.storage === variant.storage && value.ram === variant.ram;

                    return (
                      <button
                        key={`${value.storage || "standard"}-${value.ram || "base"}`}
                        type="button"
                        onClick={() => setVariant(value)}
                        className={`rounded-sm border px-4 py-3 text-left text-sm font-medium transition ${
                          isSelected
                            ? "border-[#2874f0] bg-[#f0f7ff] text-[#2874f0]"
                            : "border-slate-300 text-slate-700"
                        }`}
                      >
                        <span className="block">{getVariantLabel(value)}</span>
                        <span className="mt-1 block text-xs text-slate-500">
                          {formatPrice(value.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-slate-200 pt-6">
              <h2 className="text-base font-semibold text-slate-900">Highlights</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {productHighlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-slate-700">
                    <FaCheckCircle className="mt-0.5 shrink-0 text-[#26a541]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-sm bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">Specifications</h2>

            <dl className="mt-4 divide-y divide-slate-200">
              {specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="grid gap-1 py-3 sm:grid-cols-[180px_minmax(0,1fr)]"
                >
                  <dt className="text-sm font-medium text-slate-500">
                    {spec.label}
                  </dt>
                  <dd className="text-sm text-slate-800">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <section className="rounded-sm bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Delivery</h2>

            <div className="mt-4 flex gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Enter delivery pincode
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Delivery by {getDeliveryDate()} | Free
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {serviceHighlights.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-3">
                  <Icon className="mt-1 shrink-0 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{title}</p>
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-sm bg-white p-5 shadow-sm">
            <div className="flex gap-3">
              <FaStore className="mt-1 shrink-0 text-slate-500" />
              <div>
                <h2 className="text-base font-semibold text-slate-900">Seller</h2>
                <p className="mt-2 text-sm font-medium text-[#2874f0]">
                  MobileStore Retail
                </p>
                <p className="mt-1 text-sm text-green-600">
                  7 Days Service Center Replacement/Repair
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>GST invoice available</li>
                  <li>Fast delivery from trusted warehouse partners</li>
                  <li>Secure packaging and verified dispatch</li>
                </ul>
              </div>
            </div>
          </section>
        </aside>
      </section>

      {otherBrandModels.length > 0 && (
        <section className="rounded-sm bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                More from {brandLabel}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Explore similar models from the same brand.
              </p>
            </div>

            <Link
              href={`/product/${brandSlug}`}
              className="text-sm font-semibold text-[#2874f0]"
            >
              View all products
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {otherBrandModels.slice(0, 4).map((model) => (
              <Link
                key={model.id}
                href={`/product/${brandSlug}?product=${model.id}`}
                className="rounded-sm border border-slate-200 p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex min-h-[180px] items-center justify-center rounded-sm bg-slate-50 p-4">
                  <Image
                    src={model.images?.[0] || model.image || "/logo1.png"}
                    alt={model.name}
                    width={180}
                    height={180}
                    className="h-auto max-h-[150px] w-auto object-contain"
                  />
                </div>
                <h3 className="mt-4 text-sm font-medium text-slate-800">
                  {model.name}
                </h3>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {formatPrice(getListingPrice(model))}
                </p>
                <p className="mt-1 text-sm text-[#388e3c]">
                  Up to {model.discount}% off
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
