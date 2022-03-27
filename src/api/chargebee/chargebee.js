const chargebee = require("chargebee");
const { array } = require("joi");
require("dotenv").config();
const { request } = require("../../config/express");
const { exceptions } = require("../../config/logger");

chargebee.configure({
  site: process.env["SITE"],
  api_key: process.env["API_KEY"],
});

let allCustomers = [];
let allOrders = [];
let customersAndOrders = [];

chargebee.customer.list({}).request(function (error, result) {
  if (error) {
    //handle error
    console.log(error);
  } else {
    for (var i = 0; i < result.list.length; i++) {
      var entry = result.list[i];
      allCustomers.push(entry);
    }
  }
});

chargebee.order.list({}).request(function (error, order) {
  if (error) {
    //handle error
    console.log(error);
  } else {
    for (var i = 0; i < order.list.length; i++) {
      var entry = order.list[i];
      allOrders.push(entry);
    }
  }
});

setInterval(function merge() {
  const map = new Map();
  allCustomers.forEach((item) => map.set(item.id, item));
  allOrders.forEach((item) =>
    map.set(item.customer_id, { ...map.get(item.customer_id), ...item })
  );
  customersAndOrders = [...Array.from(map.values()), ...allCustomers];
}, 2000);

chargebee.get = async (req, res) => {
  res.json(await customersAndOrders);
};

module.exports = chargebee;
