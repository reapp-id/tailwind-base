const Handlebars = require("handlebars/runtime");
Handlebars.registerHelper("ifvalue", function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}); 
module.exports = Handlebars;
