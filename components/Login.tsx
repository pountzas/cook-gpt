"use client";

import { signIn } from "next-auth/react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import CookGPTLogo from "../public/assets/svg/CookGPTLogo";

export default function Login() {
  return (
    <section className="bg-[#343541] min-h-[100vh]">
      <div className="flex flex-col items-center justify-center pt-48 text-center">
        <CookGPTLogo size={150} />
        <p className="pt-20 italic text-gray-200 font-xs">
          <b>CookGPT</b> This is not a real App, it is built for educational
          purposes only.
        </p>
        {authOptions.providers.map((provider) => (
          <div
            className="flex flex-col items-center pt-5 space-y-3"
            key={provider.name}
          >
            <button
              className="p-2 m-2 bg-gray-300 rounded-2xl"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
