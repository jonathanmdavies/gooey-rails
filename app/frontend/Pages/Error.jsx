/* eslint-disable react/no-unescaped-entities */
import React from "react";
import propTypes from "prop-types";
import BackgroundImage from "../images/unauthenticated_background.jpg";
import LinkButton from "@/components/Base/LinkButton";

export default function Error({ status }) {
  return (
    <main
      className="min-h-screen bg-cover bg-top sm:bg-top"
      style={{
        backgroundImage: `url("${BackgroundImage}")`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-slate8600 font-mono text-sm font-semibold uppercase tracking-wide text-opacity-50">
          {status} error
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
          This isn't the page you're looking for.
        </h1>
        <p className="mt-2 font-mono text-lg font-medium text-slate-800 text-opacity-50">
          It seems we've encountered an error.
        </p>
        <div className="mt-6">
          <LinkButton color="darkSlate" href="/">
            Take me home
          </LinkButton>
        </div>
      </div>
    </main>
  );
}

Error.propTypes = {
  status: propTypes.string.isRequired,
};
