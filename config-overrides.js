const path = require('path');
const rewireCssModules = require('react-app-rewire-css-modules');

module.exports = function override(config, env) {
  if (env === 'production') {
    config.devtool = false;
  }
  config.resolve.alias = {
    app_root: path.resolve('./src/'),
  };

  config = rewireCssModules(config, env);

  config.resolve = config.resolve || {};

  config.module = {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  };

  return config;
};
