const govukPrototypeKit = require("govuk-prototype-kit");
const addFilter = govukPrototypeKit.views.addFilter;

// v13 also exposes addFunction (used by some component ecosystems)
// If it doesn't in your kit build, see the fallback note below.
const addFunction = govukPrototypeKit.views.addFunction;

/**
 * ONS chart macros commonly need:
 * - tojson filter (for embedding config objects into inline JS)
 * - extend function (for merging option objects)
 */

// `tojson` as a filter (Nunjucks calls it like: {{ obj | tojson }})
addFilter(
  "tojson",
  (value) => JSON.stringify(value),
  { renderAsHtml: true }
);

// `extend` as a global function (Nunjucks calls it like: {{ extend(a, b) }})
if (typeof addFunction === "function") {
  addFunction("extend", (base = {}, extra = {}) => {
    return { ...base, ...extra };
  });
}
