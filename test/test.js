var assert = require('assert');
var TestSimpleExpSmooth = require('./simpleExponentialSmoothingTest.js');

describe('predictSimpleExpSmooth()', function() {
  it('', function() {
  	var expectedResult = [null, 27, 27.8, 26.28, 24.168, 24.9008, 24.14048, 25.284288, 25.1705728, 23.50234368, 23.701406207999998, 24.6208437248, 26.37250623488, 25.823503740928];
  	var result = TestSimpleExpSmooth.testPredict();
  	var same = true;
  	var i = 0;
  	while(i < result.length && same)
  	{
  		if(result[i] != expectedResult[i])
  		{
  			same = false;
  		}
  		++i;
  	}

  	console.log("Expected result : ");
  	console.log(expectedResult);
  	console.log("Obtained result : ");
  	console.log(result);
    assert.equal(same, true);
  });
});