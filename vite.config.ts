import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: { sourcemap: false },
  plugins: [RubyPlugin(), react()],
});
