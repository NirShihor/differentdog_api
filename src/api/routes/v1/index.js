const express = require("express");
const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const chargebee = require("../../chargebee/chargebee");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

router.get("/customers", chargebee.get);

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
