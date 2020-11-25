const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
  [
    withFonts,
    withImages,
    [withExpo, { projectRoot: __dirname }],
  ],
  {
    // webpack(config, { dev }) {
    //   if (dev) {
    //     config.devtool = 'cheap-module-source-map';
    //   }
    //   return config;
    // }
  }
)
