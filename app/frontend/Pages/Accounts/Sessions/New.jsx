import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import Unauthenticated from "@/Layouts/Unauthenticated";
import FlashMessages from "@/components/FlashMessages";
import Input from "@/components/Base/Input";
import { account_session_path } from "@/routes";

export default function New() {
  const { data, setData, post, processing, transform } = useForm({
    email: "",
    password: "",
    remember_me: false,
  });

  function submit(e) {
    e.preventDefault();
    transform(() => ({
      account: { ...data },
    }));
    post(account_session_path());
  }

  return (
    <Unauthenticated>
      <>
        <FlashMessages />
        <div className="">
          <h2 className="text-2xl font-semibold text-slate-800">Sign in</h2>
          <p className="mt-2 font-mono text-sm font-medium text-slate-600">
            New to Gooey?{" "}
            <a href="/" className="text-cyan-600 hover:text-cyan-700">
              Sign up for an account.
            </a>
          </p>
        </div>
        <form onSubmit={submit} className="mt-12 space-y-8">
          <Input
            label="Email Address"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            type="email"
            name="email"
            id="email"
          />
          <Input
            label="Password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            type="password"
            name="password"
            id="password"
          />
          <div className="flex justify-between">
            <div className="flex items-center">
              <input
                value={data.remember_me}
                onChange={(e) => setData("remember_me", e.target.checked)}
                type="checkbox"
                className="mr-2 rounded border-slate-300 text-cyan-600 focus:ring-1 focus:ring-cyan-500"
                id="remember"
              />
              <label htmlFor="remember" className="text-sm text-slate-500">
                Remember Me
              </label>
            </div>
            <div className="">
              <a href="/" className="text-sm text-slate-500">
                Forgot your Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
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
