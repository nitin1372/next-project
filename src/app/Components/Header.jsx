"use client";


import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import { Suspense, useEffect, useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useCart } from "../context/cartContext.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "@/firebase/auth";

const SearchFallback = () => (
  <div className="h-10 w-full rounded-lg border border-[#dbe5ff] bg-[#f0f5ff] sm:h-12" />
);

const Header = () => {
  const { cart } = useCart();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
  const avatarSrc =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.email || "User"
    )}`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-3 py-3 shadow-md sm:px-4">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-3">
        <div className="flex items-center gap-2 sm:gap-3 lg:grid lg:grid-cols-[1fr_minmax(460px,640px)_1fr] lg:gap-4 xl:grid-cols-[1fr_minmax(560px,760px)_1fr]">
          <div className="logo shrink-0 lg:justify-self-start">
            <Link href="/">
              <Image
                src="/logo1.png"
                width={120}
                height={40}
                alt="logo"
                priority
                className="h-auto w-[82px] sm:w-[100px] lg:w-[120px]"
              />
            </Link>
          </div>

          <div className="min-w-0 flex-1 md:max-w-xl lg:w-full lg:max-w-none lg:justify-self-center">
            <Suspense fallback={<SearchFallback />}>
              <Search />
            </Suspense>
          </div>

          <div className="ml-auto hidden items-center justify-end gap-2 sm:gap-3 md:flex lg:ml-0 lg:justify-self-end">
            <Link
              href="/"
              className="inline-flex cursor-pointer rounded-md px-2 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary sm:px-3"
            >
              Home
            </Link>

            {user ? (
              <>
                <img
                  src={avatarSrc}
                  alt={user.email || "user"}
                  referrerPolicy="no-referrer"
                  className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                />

                <button
                  onClick={handleLogout}
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-md px-2 py-1 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:px-3 sm:py-2"
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="rounded-md bg-primary px-2 py-1 text-sm font-medium text-white transition hover:opacity-90 sm:px-3 sm:py-2"
                >
                  Signup
                </Link>
              </>
            )}

            <Link
              href="/cart"
              className="relative rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
              aria-label="Cart"
            >
              <FaShoppingCart className="cursor-pointer text-lg" />

              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            {user ? (
              <img
                src={avatarSrc}
                alt={user.email || "user"}
                referrerPolicy="no-referrer"
                className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              />
            ) : (
              <Link
                href="/auth/signup"
                className="rounded-md bg-primary px-2.5 py-2 text-xs font-medium text-white transition hover:opacity-90 sm:px-3 sm:text-sm"
              >
                Signup
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-100"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-base" />
              ) : (
                <FaBars className="text-base" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:hidden">
            <div className="flex flex-col">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Home
              </Link>

              {!user && (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>
              )}

              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <span>Cart</span>
                <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                  {totalItems}
                </span>
              </Link>

              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
