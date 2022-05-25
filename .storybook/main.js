const { mergeConfig } = require("vite");
const path = require("path");

module.exports = {
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./../app"),
        },
      },
    });
  },
  core: { builder: "@storybook/builder-vite" },
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
};
