import Link from "next/link";
import { getBrandBySlug, searchCatalog } from "@/lib/searchCatalog";

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query =
    typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q : "";
  const trimmedQuery = query.trim();
  const { brandMatches, productMatches } = searchCatalog(trimmedQuery);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-5 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white px-6 py-5 shadow-sm">
          <p className="text-sm font-medium text-[#2874f0]">Search Results</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            {trimmedQuery ? `Results for "${trimmedQuery}"` : "Search phones"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {trimmedQuery
              ? `${brandMatches.length} brand matches and ${productMatches.length} product matches found.`
              : "Try searching for Samsung, Moto, AI+, Pixel, Realme or any phone name."}
          </p>
        </div>

        {!trimmedQuery ? (
          <div className="mt-6 rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-slate-600">
              Start typing in the search bar to find brands and phones.
            </p>
          </div>
        ) : brandMatches.length === 0 && productMatches.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-slate-600">
              No results found for &ldquo;{trimmedQuery}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {brandMatches.length > 0 && (
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Matching Brands
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {brandMatches.map((brand) => (
                    <Link
                      key={brand.slug}
                      href={`/product/${brand.slug}`}
                      className="rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <img
                        src={brand.image}
                        alt={brand.label}
                        className="h-20 w-full object-contain"
                      />
                      <p className="mt-3 text-center font-semibold text-slate-800">
                        {brand.label}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {productMatches.length > 0 && (
              <section className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  Matching Products
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {productMatches.map((product) => {
                    const brand = getBrandBySlug(product.brand);
                    const price = product.variants?.[0]?.price ?? product.price;
                    const originalPrice =
                      product.variants?.[0]?.originalPrice ??
                      product.originalPrice ??
                      price;

                    return (
                      <article
                        key={product.id}
                        className="rounded-2xl border border-slate-200 p-4 transition hover:shadow-lg sm:p-5"
                      >
                        <img
                          src={product.images?.[0] || product.image}
                          alt={product.name}
                          className="mx-auto h-auto w-[120px] object-contain sm:w-[150px] md:w-[170px]"
                        />

                        <p className="mt-4 text-sm font-medium text-[#2874f0]">
                          {brand?.label || product.brand}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
                          {product.name}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                          <span className="text-lg font-bold text-slate-900 sm:text-xl">
                            Rs. {price}
                          </span>
                          <span className="text-sm text-slate-400 line-through">
                            Rs. {originalPrice}
                          </span>
                        </div>

                        {product.description?.length > 0 && (
                          <ul className="mt-4 space-y-2 text-sm text-slate-600">
                            {product.description.slice(0, 2).map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          <Link
                            href={`/product/${product.brand}?product=${product.id}`}
                            className="rounded-lg bg-[#2874f0] px-4 py-2 text-center text-sm font-semibold text-white"
                          >
                            View Phone
                          </Link>
                          <Link
                            href={`/product/${product.brand}`}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700"
                          >
                            View Brand
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

