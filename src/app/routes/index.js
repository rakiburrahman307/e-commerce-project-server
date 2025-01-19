const userAuthRouter = require("./userAuthRouter");
const productRouter = require("./productRoute");
const reviewRouter = require("./reviewRoute");
const cartRouter = require("./cartRoute");
const wishListRouter = require("./wishListRoute");
const express = require("express");

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    module: userAuthRouter,
  },
  {
    path: "/products",
    module: productRouter,
  },
  {
    path: "/reviews",
    module: reviewRouter,
  },
  {
    path: "/cart",
    module: cartRouter,
  },
  {
    path: "/wish",
    module: wishListRouter,
  },
];

moduleRoutes?.forEach((route) => router.use(route?.path, route?.module));
module.exports = router;
