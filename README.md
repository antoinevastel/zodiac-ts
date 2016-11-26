# Zodiac-ts ![alt tag](http://img15.hostingpics.net/pics/617223sign.png)
[![Build Status](https://travis-ci.org/antoinevastel/zodiac-ts.svg?branch=master)](https://travis-ci.org/antoinevastel/zodiac-ts)

Zodiac-ts is a time series library written in Javascript.
Currently, it implements the following algorithms : 
- Simple exponential smoothing;
- Double exponential smoothing;
- Holt Smoothing;
- Holt Winters smoothing;
- Moving average.

How to use Zodiac-ts ?
- You can install it using npm, by writting : npm install zodiac-ts
- Or you can simply clone it using git clone

```javascript
zodiac = require("zodiac-ts");
var data = [25, 29, 24, 21, 26, 23, 27, 25, 21, 24, 26, 29, 25];

//Case of simple exponential smoothing
var alpha = 0.4;

var ses = new zodiac.SimpleExponentialSmoothing(data, alpha);
var forecast = ses.predict(); //return an array with estimated values until t+1

//You can optimize alpha value
var optimizedAlpha = ses.optimizeParameter(20); //You have to pass the number of iterations as parameter
//After the optimization, the value of alpha is directly set to optimizedAlpha

//You can predict again with the optimized value of alpha
var optimizedForecast = ses.predict();


//Case of double exponential smoothing
var des = new zodiac.DoubleExponentialSmoothing(data, alpha);
forecast = des.predict(3); //You have to pass the horizon of the prediction

//You can also optimize alpha value
optimizedAlpha = des.optimizeParameter(20);
//After the optimization, the value of alpha is directly set to optimizedAlpha

//Case of Holt smoothing
var gamma = 0.3;
var hs = new zodiac.HoltSmoothing(data, alpha, gamma)
forecast = hs.predict(3); //Horizon of 3
var optimizedParameters = hs.optimizeParameters(20); //return an object containing the optimized value of alpha and gamma
//After the optimization, the value of alpha and gamma are directly set to the optimized values

//Case of Holt Winters smoothing
var delta = 0.5;
var seasonLength = 4;
var multiplicative = false; //indicates if the model is additive or multiplicative

var hws = new zodiac.HoltWintersSmoothing(data, alpha, gamma, delta, seasonLength, multiplicative);
forecast = hws.predict();
optimizedParameters = hws.optimizeParameters(20); //return an object containing the optimized values of alpha, gamma and delta
//After the optimization, the value of alpha, gamma and delta are directly set to the optimized values

//Case of moving average
var ma = new zodiac.MovingAverage(data);
var order = 1;
dataSmoothed = ma.smooth(order);
//The mean is taken from an equal number (order) of data on either side of a central value 

```
