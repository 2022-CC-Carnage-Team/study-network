module.exports = {
  globDirectory: "./public/",
  globPatterns: ["**/*.{html,js,css}"],
  swDest: "./public/sw.js",
  clientsClaim: true,
  skipWaiting: true,
};
