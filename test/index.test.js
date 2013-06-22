/**
 * Test dependencies
 */

var SmD = require("../")
  , expect = require("expect.js");


/**
 * Demonstrate what smd does with tests.
 */

describe("SmD", function(){

  describe("#now", function(){
    it("should be very close to Date.now()", function() {
      var now = SmD.now();
      var dtNow = Date.now();
      var long = SmD.at(now);

      expect(now).to.be.a('number');
      expect(dtNow-long).to.be.lessThan(60 * 60 * 1000);
    });
  });

  describe("#at", function(){
    it("should support negative and positive numbers", function() {
      var early = SmD.at(-1*Math.pow(2,15));
      var late = SmD.at(Math.pow(2,16)-1);

      // 2003-08-24T00:00:00Z
      expect(early).to.be.equal(SmD.min().getTime());
      // 2014-11-10T00:00:00Z
      expect(late).to.be.equal(SmD.max().getTime());
    });
  });

  describe("#from", function(){
    it("should support negative and positive numbers", function() {
      var smd = SmD.from(Date.now());
      expect(smd).to.be.lessThan(SmD.range);
    });
  });

  describe("#date", function(){
    it("should return Date objects", function() {
      var early = SmD.date(-1*Math.pow(2,15));
      var late = SmD.date(Math.pow(2,16)-1);

      // 2003-08-24T00:00:00Z
      expect(early).to.eql(new Date(SmD.min()));
      // 2014-11-10T00:00:00Z
      expect(late).to.eql(new Date(SmD.max()));
    });
  });

  describe("#min", function(){
    it("should be -1/2 the range", function() {
      var CustomSmD = SmD.custom({ range: 16 });
      expect(CustomSmD.min()).to.eql(CustomSmD.date(-8));
    });
  });

  describe("#max", function(){
    it("should be the range - 1", function() {
      var CustomSmD = SmD.custom({ range: 16 });
      expect(CustomSmD.max()).to.eql(CustomSmD.date(15));
    });
  });

  describe("#seconds_from_now", function(){
    it("should be accurate, but rounded down", function() {
      var CustomSmD = SmD.custom({ ms_per_unit: 1000 });
      var seconds = CustomSmD.seconds_from_now(CustomSmD.now()+5);
      expect(seconds).to.equal(4);
    });
  });

});
