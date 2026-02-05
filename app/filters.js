//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

// Adds commas to separate thousands, for numbers greater than 999
addFilter('addcommas', function (content) {
  // TO DO - add case to handle nothing being there 
  return content.toLocaleString("en-US") 
})

// app/filters.js
module.exports = (env) => {
  // tojson filter (ONS templates use it)
  env.addFilter("tojson", (value) => JSON.stringify(value))

  // extend global (ONS templates call extend(...))
  env.addGlobal("extend", (...objects) => Object.assign({}, ...(objects || []).filter(Boolean)))
}
