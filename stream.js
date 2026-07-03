const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

router.use(
  createProxyMiddleware({
    target: "http://100.117.158.50:8888",
    changeOrigin: true,
    ws: true,

    // v4 of http-proxy-middleware only recognizes event handlers nested
    // under `on`. The old top-level `onProxyRes` key is silently ignored
    // (not an error — it just never fires), which meant these CORS headers
    // were never actually being added to the camera stream responses.
    on: {
      proxyRes: (proxyRes, req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, ngrok-skip-browser-warning"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      },
      error: (err, req, res) => {
        console.error("[proxy error]", err.message);
        if (res && typeof res.writeHead === "function" && !res.headersSent) {
          res.writeHead(502, { "Content-Type": "text/plain" });
          res.end("Camera stream proxy error: " + err.message);
        }
      },
    },
  })
);

module.exports = router;
