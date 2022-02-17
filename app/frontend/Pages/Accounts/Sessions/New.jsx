import React from "react";
import Unauthenticated from "@/Layouts/Unauthenticated";
import FlashMessages from "@/components/FlashMessages";

import { account_session_path } from "@/routes";
import { useForm } from "@inertiajs/inertia-react";

export default function New() {
  const { data, setData, post, processing } = useForm({
    email: "",
    password: "",
    remember_me: false,
  });

  function submit(e) {
    e.preventDefault();
    post(account_session_path({ account: data }));
  }

  return (
    <Unauthenticated>
      <>
        <FlashMessages />
        <div className="">
          <h2 className="text-2xl font-semibold text-slate-800">Sign in</h2>
          <p className="mt-2 font-mono text-sm font-medium text-slate-600">
            New to Gooey?{" "}
            <a href="#" className="text-cyan-600 hover:text-cyan-700">
              Sign up for an account.
            </a>
          </p>
        </div>
        <form onSubmit={submit} className="mt-12 space-y-8">
          <div className="relative rounded-lg border border-slate-300 px-3 py-2 focus-within:border-cyan-600 focus-within:ring-0 focus-within:ring-cyan-600">
            <label
              htmlFor="email"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-mono text-xs font-medium text-slate-800"
            >
              Email Address
            </label>
            <input
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              type="email"
              name="email"
              id="email"
              className="block w-full border-0 p-0 text-sm text-slate-800 placeholder-slate-500 focus:ring-0"
            />
          </div>

          <div className="relative rounded-lg border border-slate-300 px-3 py-2 focus-within:border-cyan-600 focus-within:ring-0 focus-within:ring-cyan-600">
            <label
              htmlFor="password"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 font-mono text-xs font-medium text-slate-800"
            >
              Password
            </label>
            <input
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              type="password"
              name="password"
              id="password"
              className="block w-full border-0 p-0 text-sm text-slate-800 placeholder-gray-500 focus:ring-0"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                value={data.remember_me}
                onChange={(e) => setData("remember_me", e.target.checked)}
                type="checkbox"
                className="mr-2 rounded border-slate-300 text-cyan-600 focus:ring-1 focus:ring-cyan-500"
                id="remember"
              />
              <label labelfor="remember" className="text-sm text-slate-500">
                Remember Me
              </label>
            </div>
            <div className="">
              <a href="#" className="text-sm text-slate-500">
                Forgot your Password?
              </a>
            </div>
          </div>
          <button
            disabled={processing}
            className="rounded-full bg-gradient-to-br from-cyan-600 to-cyan-500 px-5 py-2 font-mono text-xs font-medium text-white transition hover:bg-cyan-700 active:scale-95"
          >
            Sign in
          </button>
        </form>
      </>
    </Unauthenticated>
  );
}
