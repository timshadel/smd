
/**
 * Module dependencies.
 */

var debug = require('simple-debug')
  , log = require('metric-log');


/**
 * Defines
 */

var MS_PER_SECOND = 1000
  , MS_PER_MINUTE = 60 * MS_PER_SECOND
  , MS_PER_HOUR = 60 * MS_PER_MINUTE
  , INT_RANGE = Math.pow(2, 16);


/**
 * Expose smd function as the module.
 */

exports = module.exports = new SmD(MS_PER_HOUR, INT_RANGE);

exports.minute = new SmD(MS_PER_MINUTE, INT_RANGE);

exports.custom = function(config) {
  config = config || {};
  return new SmD(config.ms_per_unit || MS_PER_HOUR, config.range || INT_RANGE);
}

exports.MS_PER_SECOND = MS_PER_SECOND;
exports.MS_PER_MINUTE = MS_PER_MINUTE;
exports.MS_PER_HOUR = MS_PER_HOUR;
exports.INT_RANGE = INT_RANGE;


/**
 * Create a smd
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function SmD(ms_per_unit, range) {
  this.ms_per_unit = ms_per_unit;
  this.range = range;
  this.range_in_ms = ms_per_unit * range;
}

/**
 * Create a super-small date, expressed in hours. It is interpreted as
 * the number of hours since the last whole 2^16 hours since Jan 1, 1970.
 */

SmD.prototype.now = function() {
  return this.from(Date.now());
};

/**
 * Create a super-small date, expressed in hours. It is interpreted as
 * the number of hours since the last whole 2^16 hours since Jan 1, 1970.
 */

SmD.prototype.from = function(date_ms) {
  return Math.floor((date_ms % this.range_in_ms) / this.ms_per_unit);
};

/**
 * Earliest date we can represent
 */

SmD.prototype.min = function() {
  return this.date(-1 * this.range/2);
}

/**
 * Latest date we can represent
 */

SmD.prototype.max = function() {
  return this.date(this.range-1);
}

/**
 * Convert a super-small date back to a regular JavaScript Date object.
 */

SmD.prototype.at = function(date_units) {
  return date_units * this.ms_per_unit + Math.floor(Date.now()/this.range_in_ms)*this.range_in_ms;
}

/**
 * Convert a super-small date back to a regular JavaScript Date object.
 */

SmD.prototype.date = function(from) {
  return new Date(this.at(from));
}

/**
 * Returns the distance of the super-small date from now, in seconds.
 */

SmD.prototype.seconds_from_now = function(from) {
  return Math.floor((this.at(from) - Date.now()) / MS_PER_SECOND);
}
