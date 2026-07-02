const express = require("express");

const {
    createProxyMiddleware
} = require("http-proxy-middleware");


const router = express.Router();



router.use(
    "/",
    createProxyMiddleware({

        target: "http://100.117.158.50:8888",

        changeOrigin: true,

        ws: true,

        pathRewrite: {
            "^/": "/"
        }

    })
);

module.exports = router;