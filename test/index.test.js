/**
 * Test dependencies
 */

var SmD = require("../")
  , expect = require("expect.js");


/**
 * Demonstrate what smd does with tests.
 */

describe("SmD", function(){

  it("should return #now()", function() {
    var now = SmD.now();
    expect(now).to.be.a('number');
  });

});
