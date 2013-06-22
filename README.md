
# smd - Small Dates [![Build Status](https://travis-ci.org/timshadel/smd.png?branch=master)](https://travis-ci.org/timshadel/smd)

Represents dates as 3-bytes in [msgpack][msgpack]. We assume dates after 1970, and reasonably close to 'now'. Their best use is for fairly short-lived expiration dates (months), which don't require incredible precision (nearest hour or nearest minute is fine). These constraints yield a compression of around 66%, which is fantastic for the intended uses.

[msgpack]: http://msgpack.org

## Examples

```js
var SmD = require('smd');

var s = SmD.now();
// => 53391
var l = SmD.at(s);
// => 1371855692507
var d = SmD.date(s);
// => Fri Jun 21 2013 19:01:32 GMT-0400 (EDT)
```

```js
var SmD = require('smd')
  , msg = require('msgpack');

var d = Date.now();
// => 1371855692507
var s = SmD.from(d);
// => 53391

msg.pack(d);
// => <SlowBuffer cb 42 73 f6 8f 8a 2d b0 00>
msg.pack(r);
// => Pack <SlowBuffer cd d0 8f>
```

## License 

MIT. See LICENSE for details.
