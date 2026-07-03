const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

router.use(
  createProxyMiddleware({
    target: "http://100.117.158.50:8888",
    changeOrigin: true,
    ws: true,

    onProxyRes: (proxyRes, req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, ngrok-skip-browser-warning"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, OPTIONS"
      );
    },
  })
);

module.exports = router;
