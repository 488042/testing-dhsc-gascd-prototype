//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require("govuk-prototype-kit");
const addFilter = govukPrototypeKit.views.addFilter;

// Existing filter you had
addFilter("addcommas", function (content) {
  if (content === null || content === undefined) return "";
  // toLocaleString works for numbers; if it's a string, try coercion
  const n = typeof content === "number" ? content : Number(content);
  return Number.isFinite(n) ? n.toLocaleString("en-US") : String(content);
});

// ✅ IMPORTANT: export a single function that registers all ONS-required helpers
module.exports = function (env) {
  // ONS templates use this
  env.addFilter("tojson", (value) => JSON.stringify(value));

  // Helper to append to arrays (immutably)
  env.addFilter("onsArrayAppend", (arr, item) => {
    const out = Array.isArray(arr) ? arr.slice() : [];
    out.push(item);
    return out;
  });

  /**
   * ✅ Implement `extend` to behave the way the ONS chart macro expects.
   * In the chart macro, it is used like: extend(seriesArray, seriesItemObject)
   * So: if first arg is an array => push item and return the array.
   * Otherwise (object merge use case) => shallow merge into a new object.
   */
  env.addGlobal("extend", (target, value) => {
    if (Array.isArray(target)) {
      target.push(value);
      return target;
    }
    if (target && typeof target === "object" && value && typeof value === "object") {
      return Object.assign({}, target, value);
    }
    return target;
  });

  return env;
};
