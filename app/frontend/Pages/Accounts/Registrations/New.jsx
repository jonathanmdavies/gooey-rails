import React from "react";
import { useForm, Link } from "@inertiajs/inertia-react";
import Unauthenticated from "@/Layouts/Unauthenticated";
import FlashMessages from "@/components/FlashMessages";
import Input from "@/components/Base/Input";
import Button from "@/components/Base/Button";
import { new_account_session_path, account_registration_path } from "@/routes";

export default function New() {
  const { data, setData, post, processing, errors, transform } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function submit(e) {
    e.preventDefault();
    transform(() => ({
      account: { ...data },
    }));
    post(account_registration_path());
  }

  return (
    <Unauthenticated>
      <>
        <FlashMessages />
        <div className="">
          <h2 className="text-2xl font-semibold text-slate-800">
            Create an account.
          </h2>
          <p className="mt-2 font-mono text-sm font-medium text-slate-600">
            Already have an account?{" "}
            <Link
              href={new_account_session_path()}
              className="text-cyan-600 hover:text-cyan-700"
            >
              Sign in.
            </Link>
          </p>
        </div>
        <form onSubmit={submit} className="mt-12 space-y-8">
          <Input
            label="Name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            type="text"
            name="name"
            id="name"
            errors={errors.name}
          />
          <Input
            label="Email Address"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            type="email"
            name="email"
            id="email"
            errors={errors.email}
          />
          <Input
            label="Password"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            type="password"
            name="password"
            id="password"
            errors={errors.password}
          />

          <Input
            label="Confirm password"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            errors={errors.password_confirmation}
          />

          <Button
            type="submit"
            color="darkSlate"
            size="md"
            disabled={processing}
          >
            Sign up
          </Button>
        </form>
      </>
    </Unauthenticated>
  );
}
