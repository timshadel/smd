
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
  , DEFAULT_RANGE = Math.pow(2, 16);


/**
 * Expose smd function as the module.
 */

exports = module.exports = new SmD(MS_PER_HOUR, DEFAULT_RANGE);

exports.minute = new SmD(MS_PER_MINUTE, DEFAULT_RANGE);

exports.custom = function(ms_per_unit, range) {
  return new SmD(ms_per_unit || MS_PER_HOUR, range || DEFAULT_RANGE);
}


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
  return this.at(Date.now());
};

/**
 * Create a super-small date, expressed in hours. It is interpreted as
 * the number of hours since the last whole 2^16 hours since Jan 1, 1970.
 */

SmD.prototype.at = function(date_ms) {
  return Math.floor((date_ms % this.range_in_ms) / this.ms_per_unit);
};

/**
 * Convert a super-small date back to a regular JavaScript Date object.
 */

SmD.prototype.date = function(at) {
  return new Date(at * this.ms_per_unit + Math.floor(Date.now()/this.range_in_ms)*this.range_in_ms);
}

/**
 * Returns the distance of the super-small date from now, in seconds.
 */

SmD.prototype.seconds_from_now = function(at) {
  return Math.floor((this.when(at) - Date.now()) / MS_PER_SECOND);
}
