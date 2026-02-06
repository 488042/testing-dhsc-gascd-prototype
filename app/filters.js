//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require("govuk-prototype-kit");
const addFilter = govukPrototypeKit.views.addFilter;

// Adds commas to separate thousands, for numbers greater than 999
addFilter("addcommas", function (content) {
  if (content === null || content === undefined) return "";
  if (typeof content === "number") return content.toLocaleString("en-GB");
  return String(content);
});

// ONS templates use `tojson`
addFilter("tojson", function (value) {
  return JSON.stringify(value, (key, val) => {
    // Remove undefined (invalid in JSON)
    if (typeof val === "undefined") return undefined;

    // Remove NaN/Infinity (also invalid JSON for parsers expecting strict JSON)
    if (typeof val === "number" && !Number.isFinite(val)) return null;

    return val;
  });
});


// Helper to build arrays immutably in Nunjucks
addFilter("onsArrayAppend", function (arr, item) {
  const out = Array.isArray(arr) ? arr.slice() : [];
  out.push(item);
  return out;
});
