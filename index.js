var _ = require('lodash')

module.exports = function (raw) {
  raw = String(raw)
  var ending = _.get(raw.match(/}(\n*)$/), 1)
  var indent = _.get(raw.match(/^[ \t]+/m), 0)

  var data = JSON.parse(raw)

  return {
    data: data,
    get: _.bind(_.get, _, data),
    set: _.bind(_.set, _, data),
    format: function () {
      return JSON.stringify(data, null, indent) + ending
    }
  }
}
