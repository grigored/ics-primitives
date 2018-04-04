const path = require('path');
// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
  // TODO: Storybook uglify doesn't work, so we're ignoring it. ANY CONSEQUENCES BESIDES NOT BEING MINIFIED?
  // https://github.com/storybooks/storybook/issues/1570#issuecomment-320306790
  config.plugins.pop();
  return config;
};
