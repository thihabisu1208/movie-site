const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const globule = require("globule");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const dir = {
  src: "./src",
  public: "./htdocs",
  dist: "./htdocs/special/2020finalcrown"
};

const convertExtensions = {
  pug: "html",
  js: "js",
  scss: "css"
};

const entries = getEntries(convertExtensions);
const data = {};
const HtmlWebpackPlugins = [];
const ProvidePluginOption = {
  $: "jquery"
};

const BrowserSyncOption = {
  files: `${dir.public}/**/*`,
  server: { baseDir: dir.public },
  open: "external", // - IPアドレスでアクセス.
  startPath: dir.dist.replace(dir.public, ""),
  rewriteRules: [
    {
      // SSI を置換.
      match: new RegExp('<!--#include virtual="(.+)"-->', "g"),
      fn: (req, res, match, filename) => {
        const ssiPath = path.join(__dirname, dir.public, filename);
        return fs.existsSync(ssiPath)
          ? fs.readFileSync(ssiPath)
          : `<p style="color: red">${filename} could not be found</p>`;
      },
    },
  ],
};

/**
 * JSON を data にまとめる.
 */
const jsonFilesNames = globule.find({ src: ["**/*.json"], srcBase: dir.src });
jsonFilesNames.forEach((fileName) => {
  const key = fileName.replace(/data\/|\.json/g, "");
  data[key] = require(`${dir.src}/${fileName}`);
});

/**
 * ページの数だけ HtmlWebpackPlugin を自動で追加.
 */
for (const [output, src] of Object.entries(entries.pug)) {
  HtmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      inject: false, // - inject: false - script タグを動的に挿入しなくなる.
      data: data,
      filename: output,
      template: src,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    })
  );
}

/**
 * コンパイル対象を自動で追加する.
 * @param {Object} convertExtensions - key: コンパイル対象の拡張子, val: コンパイル後の拡張子.
 */
function getEntries(convertExtensions) {
  const entries = {};
  for (const [key, val] of Object.entries(convertExtensions)) {
    const entry = (entries[key] = {});

    // コンパイル対象のファイルを抽出.
    const targetFileNames = globule.find({
      src: [`**/*.${key}`, `!**/_*.${key}`], // 先頭に _ がつくファイルは対象外.
      srcBase: dir.src,
    });

    targetFileNames.forEach((fileName) => {
      let output = fileName.replace(new RegExp(key, "g"), `${val}`); // フォルダ名と拡張子を置換.

      if (val.match("html")) {
        output = output.replace(`${val}/`, "");
        entry[output] = `${dir.src}/${fileName}`;
        return;
      }

      entry[`assets/${output}`] = `${dir.src}/${fileName}`;
    });
  }

  return entries;
}

const rules = {
  js: {
    test: /\.js$/,
    // swiper 関連の js は除外しないとIEで動かない.
    exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", { modules: false }]],
        },
      },
    ],
  },
  scss: {
    test: /\.(c|sa|sc)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: { url: false },
      },
      "postcss-loader",
      "sass-loader",
    ],
  },
  pug: {
    test: /\.pug$/,
    use: [
      {
        loader: "pug-loader",
        options: {
          pretty: true,
          root: path.resolve(__dirname, `${dir.src}/pug`),
        },
      },
    ],
  },
};

module.exports = () => {
  return [
    {
      entry: entries.js,
      output: {
        filename: "[name]",
        path: path.join(__dirname, dir.dist),
      },
      module: {
        rules: [rules.js, rules.pug],
      },
      optimization: {
        splitChunks: {
          // 共通モジュールを出力
          cacheGroups: {
            vendor: {
              test: /node_modules/, // node_modules のみバンドル対象とする
              name: `./assets/js/vendor.js`,
              chunks: "all",
              enforce: true,
            },
          },
        },
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: { drop_console: true }, // ビルド時に console.log を削除.
            },
          }),
        ],
      },
      plugins: [
        new BrowserSyncPlugin(BrowserSyncOption),
        new webpack.ProvidePlugin(ProvidePluginOption),
      ].concat(HtmlWebpackPlugins),
    },
    {
      entry: entries.scss,
      output: {
        path: path.join(__dirname, dir.dist),
      },
      module: {
        rules: [rules.scss],
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name]",
        }),
        new FixStyleOnlyEntriesPlugin(), // 同名の .js ファイルを出力させない.
      ],
    },
  ];
};