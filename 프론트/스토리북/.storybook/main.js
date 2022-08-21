const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    //"../stories/**/*.stories.mdx",
    //"../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    //
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
  ],
  framework: '@storybook/react',  // "@storybook/html"
  webpackFinal: async config => {
    config.resolve.alias['src'] = path.resolve(__dirname, '../src');
    config.resolve.alias['public'] = path.resolve(__dirname, '../public');
    config.resolve.alias['config'] = path.resolve(__dirname, '../config');
    return config;
  },
};
