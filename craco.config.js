// const path = require('path');

// const rewireEntries = [
//   {
//     name: 'andi',
//     entry: path.resolve(__dirname, './src/frontends/andi/index.tsx'),
//     template: path.resolve(__dirname, './src/frontends/andi/index.html'),
//     outPath: 'andi/index.html'
//   },
//   {
//     name: 'supplier',
//     entry: path.resolve(__dirname, './src/frontends/supplier/index.tsx'),
//     template: path.resolve(__dirname, './src/frontends/supplier/index.html'),
//     outPath: 'supplier/index.html'
//   }
// ];

// const defaultEntryName = 'main';

// const appIndexes = ['js', 'tsx', 'ts', 'jsx'].map((ext) =>
//   path.resolve(__dirname, `src/index.${ext}`)
// );

// function webpackMultipleEntries(config) {
//   // Multiple Entry JS
//   const defaultEntryHTMLPlugin = config.plugins.filter((plugin) => {
//     return plugin.constructor.name === 'HtmlWebpackPlugin';
//   })[0];
//   defaultEntryHTMLPlugin.userOptions.chunks = [defaultEntryName];

//   // config.entry is not an array in Create React App 4
//   if (!Array.isArray(config.entry)) {
//     config.entry = [config.entry];
//   }

//   // If there is only one entry file then it should not be necessary for the rest of the entries
//   const necessaryEntry =
//     config.entry.length === 1
//       ? []
//       : config.entry.filter((file) => !appIndexes.includes(file));
//   const multipleEntry = {};
//   multipleEntry[defaultEntryName] = config.entry;

//   rewireEntries.forEach((entry) => {
//     multipleEntry[entry.name] = necessaryEntry.concat(entry.entry);
//     // Multiple Entry HTML Plugin
//     config.plugins.unshift(
//       new defaultEntryHTMLPlugin.constructor(
//         Object.assign({}, defaultEntryHTMLPlugin.userOptions, {
//           filename: entry.outPath,
//           template: entry.template,
//           chunks: [entry.name],
//         })
//       )
//     );
//   });
//   config.entry = multipleEntry;

//   // Multiple Entry Output File
//   let names = config.output.filename.split('/').reverse();

//   if (names[0].indexOf('[name]') === -1) {
//     names[0] = '[name].' + names[0];
//     config.output.filename = names.reverse().join('/');
//   }

//   return config;
// }

// module.exports = {
//   webpack: {
//     configure: webpackMultipleEntries,
//   },
// };

const fs = require("fs");
const path = require("path");
const { whenProd, whenDev } = require("@craco/craco");
const craPaths = require("react-scripts/config/paths");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

function webpackMultipleEntries(config, { paths }) {
      
    const ts = whenDev(() => {
        const entry = {
          index: paths.appIndexJs,
          hep: resolveApp("src/hep.tsx"),
        };

        const output = {
          ...config.output,
          filename: "static/js/[name].[contenthash:8].js",
          chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
        };
        return { ...config, entry, output };
      }, config);

console.log(config)
return ts;
}


module.exports = {
  webpack: {
    configure: webpackMultipleEntries,
    plugins: {
      remove: whenDev(() => ["ManifestPlugin", "HtmlWebpackPlugin"], []),
      add: whenDev(
        () => [
          new HtmlWebpackPlugin({
            filename: "index.html",
            inject: true,
            template: resolveApp("public/index.html"),
            chunks: ["index"],
            ...whenDev(() => ({
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            })),
          }),
          new HtmlWebpackPlugin({
            filename: "hep.html",
            inject: true,
            template: resolveApp("public/hep.html"),
            chunks: ["hep"],
            ...whenDev(() => ({
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            })),
          }),
          new WebpackManifestPlugin({
            fileName: "asset-manifest.json",
            publicPath: craPaths.publicUrlOrPath,
            generate: (seed, files, entrypoints) => {
              const manifestFiles = files.reduce((manifest, file) => {
                // eslint-disable-next-line no-param-reassign
                manifest[file.name] = file.path;
                return manifest;
              }, seed);

              console.log(seed, files, entrypoints)
              const entrypointFiles = {};
              Object.keys(entrypoints).forEach((entrypoint) => {
                entrypointFiles[entrypoint] = entrypoints[entrypoint].filter((fileName) => !fileName.endsWith(".map"));
              });

              return {
                files: manifestFiles,
                entrypoints: entrypointFiles,
              };
            },
          }),
        ],
        [],
      ),
    },
  }
};