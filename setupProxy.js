const { createProxyMiddleware } = require("http-proxy-middleware");

const YELP_GLITCH = process.env.REACT_APP_YELP_GLITCH;


module.exports = function (app) {
  app.use(
    "/api/yelpFetch/",
    createProxyMiddleware({
      target: YELP_GLITCH,
      changeOrigin: true,
    })
  );
};
