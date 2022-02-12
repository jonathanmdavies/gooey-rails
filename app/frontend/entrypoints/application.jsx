import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";

import "../css/index.css";

console.log("Vite ⚡️ Rails");

const pages = import.meta.glob("../Pages/**/*.jsx");

createInertiaApp({
  resolve: (name) => pages[`../Pages/${name}.jsx`](),
  setup({ el, App, props }) {
    render(<App {...props} />, el);
  },
});
