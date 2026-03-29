"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getBrandBySlug, searchCatalog } from "@/lib/searchCatalog";

const SearchSuggestions = ({ brandMatches, productMatches, onNavigate }) => (
  <div
    className="max-h-80 overflow-y-auto overscroll-contain py-2 pr-1 sm:max-h-[360px]"
    style={{ scrollbarGutter: "stable" }}
  >
    {brandMatches.length > 0 && (
      <div className="border-b border-slate-100 px-2 pb-2">
        <p className="px-3 py-2  text-xs font-semibold uppercase tracking-wide text-slate-400">
          Brands
        </p>
        {brandMatches.map((brand) => (
          <Link
            key={brand.slug}
            href={`/product/${brand.slug}`}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-50"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
              <Image
                src={brand.image}
                alt={brand.label}
                width={48}
                height={48}
                className="h-10 w-10 object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-800">
                {brand.label}
              </p>
              <p className="truncate text-sm font-medium text-slate-500">
                Brand category
              </p>
            </div>
          </Link>
        ))}
      </div>
    )}

    {productMatches.length > 0 && (
      <div className="px-2 pt-2">
        <p className="px-3 py-2  text-xs font-semibold uppercase tracking-wide text-slate-400">
          Phone Models
        </p>
        {productMatches.map((product) => {
          const brand = getBrandBySlug(product.brand);

          return (
            <Link
              key={product.id}
              href={`/product/${product.brand}?product=${product.id}`}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
                <Image
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-800">
                  {product.name}
                </p>
                <p className="truncate text-sm font-medium text-slate-500">
                  {brand?.label || product.brand} model
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    )}
  </div>
);

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQueryFromUrl = searchParams.get("q") || "";
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState(searchQueryFromUrl);
  const [isOpen, setIsOpen] = useState(false);

  const trimmedQuery = query.trim();
  const normalizedLength = trimmedQuery.replace(/\s+/g, "").length;
  const shouldShowSuggestions = normalizedLength >= 2;
  const { brandMatches, productMatches } = searchCatalog(trimmedQuery, {
    brandLimit: 4,
    productLimit: 10,
  });
  const hasResults = brandMatches.length > 0 || productMatches.length > 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeSearchUi = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!trimmedQuery) return;

    closeSearchUi();
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="w-full" ref={wrapperRef}>
      <div className="relative w-full">
        <form onSubmit={handleSubmit} className="relative mx-auto w-full">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsOpen(true);
              }}
              onFocus={() => {
                setIsOpen(true);
              }}
              placeholder="Search brands "
              className="h-10 w-full rounded-full border border-[#05f334k] bg-[#f0f5ff] pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:font-medium placeholder:text-slate-500 focus:border-[#9bb7ff] focus:bg-white sm:h-12 sm:text-base"
            />
            <button
              type="submit"
              className="absolute  top-1/2 z-10 px-3 flex -translate-y-1/2 items-center justify-center text-slate-500 transition hover:text-primary"
              aria-label="Search"
            >
              <IoSearch size={20} />
            </button>
          </div>

          {isOpen && trimmedQuery && shouldShowSuggestions && (
            <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-100 w-full overflow-hidden rounded-2xl bg-white shadow-md">
              {hasResults ? (
                <SearchSuggestions
                  brandMatches={brandMatches}
                  productMatches={productMatches}
                  onNavigate={closeSearchUi}
                />
              ) : (
                <div className="px-4 py-5 text-center text-sm font-medium text-slate-500">
                  No phone brands or models found for &ldquo;{trimmedQuery}&rdquo;.
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Search;
