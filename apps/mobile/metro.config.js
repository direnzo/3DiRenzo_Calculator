const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add monorepo support
config.watchFolders = [
  path.resolve(__dirname, '../../packages'),
];

config.resolver.alias = {
  '@shared': path.resolve(__dirname, '../../packages/shared/src'),
  '@pricing': path.resolve(__dirname, '../../packages/pricing/src'),
};

module.exports = config;