const { Router } = require("express");
const productsRoute = require("./productsRoute");
const usersRoute = require("./usersRoute.js");
const ordersRoute = require("./ordersRoute.js");
const favouritesRoute = require("./favouritesRoute.js");
const comentsRoute = require("./comentsRoute.js");
const couponsRoute = require("./couponsRoute.js");

const router = Router();

router.use("/products", productsRoute);
router.use("/users", usersRoute);
router.use("/orders", ordersRoute);
router.use("/favourites", favouritesRoute);
router.use("/coments", comentsRoute);
router.use("/coupons", couponsRoute);

module.exports = router;
