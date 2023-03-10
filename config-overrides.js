const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "&components": path.resolve(__dirname, "src/components"),
      "&config": path.resolve(__dirname, "src/config"),
      "&assets": path.resolve(__dirname, "src/assets"),
      "&locales": path.resolve(__dirname, "src/locales"),
      "&utils": path.resolve(__dirname, "src/utils"),
      "&hooks": path.resolve(__dirname, "src/hooks"),
    },
  };
  return config;
};
