# Zodiac-ts
[![Build Status](https://travis-ci.org/antoinevastel/zodiac.svg?branch=master)](https://travis-ci.org/antoinevastel/zodiac)
Time serie Javascript library


How to use Zodiac-ts ?

```javascript
// Your code here
zodiac = require("zodiac-ts");
var data = [25, 29, 24, 21, 26, 23, 27, 25, 21, 24, 26, 29, 25];

//Case of simple exponential smoothing
var alpha = 0.4;

var ses = new zodiac.SimpleExponentialSmoothing(data, alpha);
var forecast = ses.predict(); //return an array with estimated values until t+1

//You can optimize alpha value
var optimizedAlpha = ses.optimizeParameter(20); //You have to pass the number of iterations as parameter
```