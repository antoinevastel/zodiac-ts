var assert = require('assert');
var TestSimpleExpSmooth = require('./simpleExponentialSmoothingTest.js');
var TestDoubleExpSmooth = require('./doubleExponentialSmoothingTest.js');
var TestHoltSmooth = require('./holtSmoothingTest.js');

/*Tests for simple exponential smoothing */
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


describe('optimizeAlphaSimpleExpSmooth()', function() {
  it('Should return 0.2', function() {
  	var optimizedAlpha = TestSimpleExpSmooth.testOptimizationAlpha();
    assert.equal(optimizedAlpha, 0.2);
  });
});

/*Tests for double exponential smoothing */
describe('predictDoubleExpSmooth()', function() {
  it('', function() {
  	var expectedResult = [null, null, 103.99999999999999, 112.8, 120.63999999999999, 121.27999999999999, 127.54559999999998, 133.71392, 134.860288, 141.05533440000005, 147.7566976, 152.12811673599998, 154.6413289472, 158.51653586944002, 162.39174279168003];
  	var result = TestDoubleExpSmooth.testPredict();
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

describe('optimizeAlphaDoubleExpSmooth()', function() {
  it('Should return 0.5499...', function() {
  	var optimizedAlpha = TestDoubleExpSmooth.testOptimizationAlpha();
    assert.equal(optimizedAlpha, 0.5499999999999999);
  });
});

/*Tests for Holt smoothing */
describe('predictHoltSmooth()', function() {
  it('', function() {
  	var expectedResult = [null, 220, 222.56000000000003, 225.7216, 227.04537599999998, 230.54875135999995, 233.79907624959995, 232.75749288345597, 233.55074457174013, 236.214516887493, 237.7612962239464, 237.6266527320713, 239.47546998124915];
  	var result = TestHoltSmooth.testPredict();
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

describe('optimizeParametersHoltSmooth()', function() {
  it('Should return alpha = 0.449.. and gamma = 0.399..', function() {
  	var optimizedParameters = TestHoltSmooth.testOptimizationParameters();
  	var same = true;
  	if(optimizedParameters.alpha != 0.44999999999999996)
  	{
  		same = false;
  	}

  	if(optimizedParameters.gamma != 0.39999999999999997)
  	{
  		same = false;
  	}
    assert.equal(same, true);
  });
});