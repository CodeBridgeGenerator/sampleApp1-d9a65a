const products = require("./products/products.service.js");
const objects = require("./objects/objects.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(products);
  app.configure(objects);
    // ~cb-add-configure-service-name~
};
