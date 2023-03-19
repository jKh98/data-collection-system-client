const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "&components": path.resolve(__dirname, "src/components"),
      "&pages": path.resolve(__dirname, "src/pages"),
      "&config": path.resolve(__dirname, "src/config"),
      "&assets": path.resolve(__dirname, "src/assets"),
      "&utils": path.resolve(__dirname, "src/utils"),
      "&constants": path.resolve(__dirname, "src/constants"),
      "&hooks": path.resolve(__dirname, "src/hooks"),
      "&types": path.resolve(__dirname, "src/types"),
    },
  };
  return config;
};
