import axios from "axios";
import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";

import "../css/index.css";

// Tell Axios to send the CSRF token (taken from the cookie)
// in the header named as "X-CSRF-Token", as this is the name
// expected by Rails
axios.defaults.xsrfHeaderName = "X-CSRF-Token";

const pages = import.meta.glob("../Pages/**/*.jsx");

createInertiaApp({
  resolve: (name) => pages[`../Pages/${name}.jsx`](),
  setup({ el, App, props }) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    render(<App {...props} />, el);
  },
});
