
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "@/firebase/auth";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Success ✅");
      router.push("/auth/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row">
        
        {/* LEFT SIDE (FORM) */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-6">Create your account</p>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 mb-4 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-4 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="bg-green-500 text-white py-2 rounded-md"
          >
            Sign Up
          </button>
        </div>

        {/* RIGHT SIDE (GREEN PANEL) */}
        <div className="flex w-full flex-col items-center justify-center bg-green-500 p-8 text-white md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-center mb-6">
            Enter your personal details and start your journey with us
          </p>

          <button
            onClick={() => router.push("/auth/login")}
            className="border border-white px-6 py-2 rounded-full"
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
}















