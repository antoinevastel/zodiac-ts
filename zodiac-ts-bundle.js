(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.zodiac = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*Simple exponential smoothing */

class SimpleExponentialSmoothing {
	constructor(data, alpha)
	{
		if(data == null)
		{
			throw "data parameter is null";
		}
		else if(data.length < 2)
		{
			throw "data doesn't contain enough data to make a prediction";
		}

		if(alpha > 1 || alpha < 0)
		{
			throw "alpha parameter must be between 0 and 1";
		}

		this.data = data;
		this.alpha = alpha;
		this.forecast = null;
	};

	predict()
	{
		var forecast = Array();
		forecast[0] = null;
		forecast[1] = 0.5*(this.data[0] + this.data[1]);

		for(var i = 2; i <= this.data.length; ++i)
		{
			forecast[i] = this.alpha*(this.data[i-1] - forecast[i-1]) + forecast[i-1];
		}

		this.forecast = forecast;
		return forecast;
	};

	getForecast()
	{
		if(this.forecast == null)
		{
			this.predict();
		}
		return this.forecast;
	}

	computeMeanSquaredError()
	{ 
		var SSE = 0.0;
		var n = 0;
		for(var i = 0; i < this.data.length; ++i)
		{
			if(this.data[i] != null && this.forecast[i] != null)
			{
				SSE += Math.pow(this.data[i] - this.forecast[i], 2);	
				n++;
			} 
			
		}
		return 1/(n-1)*SSE;
	};

	optimizeParameter(iter)
	{
		var incr = 1/iter;
		var bestAlpha = 0.0;
		var bestError = -1;
		this.alpha = bestAlpha;

		while(this.alpha < 1)
		{
			var forecast = this.predict();
			var error = this.computeMeanSquaredError();
			if(error < bestError || bestError == -1)
			{
				bestAlpha = this.alpha;
				bestError = error;
			}
			this.alpha += incr;
		}

		this.alpha = bestAlpha;
		return this.alpha;
	}

}



/*Double exponential smoothing */


class DoubleExponentialSmoothing { 
	constructor(data, alpha) {
		if(data == null)
		{
			throw "data parameter is null";
		}
		else if(data.length < 2)
		{
			throw "data doesn't contain enough data to make a prediction";
		}

		if(alpha > 1 || alpha < 0)
		{
			throw "alpha parameter must be between 0 and 1";
		}

		this.data = data;
		this.alpha = alpha;
		this.forecast = null;
	};

	predict(horizon) {
		var smoothings = Object();
		smoothings.first = Array();
		smoothings.second = Array();

		smoothings.first[0] = this.data[0];
		smoothings.first[1] = this.data[1];

		for(var i = 2; i < this.data.length; ++i)
		{
			smoothings.first[i] = this.alpha*this.data[i] + (1-this.alpha)*smoothings.first[i-1];
		}

		smoothings.second[0] = smoothings.first[0];
		for(var i = 1; i < this.data.length; ++i)
		{
			smoothings.second[i] = this.alpha*smoothings.first[i] + (1-this.alpha)*smoothings.second[i-1];
		}

		smoothings.a = Array();
		smoothings.b = Array();
		for(var i = 1; i < this.data.length; ++i)
		{
			smoothings.a[i] = (this.alpha/(1-this.alpha))*(smoothings.first[i] - smoothings.second[i]);
			smoothings.b[i] = 2*smoothings.first[i] - smoothings.second[i];
		}

		var forecast = Array();
		forecast[0] = null;
		forecast[1] = null;
		for(var i = 2; i <= this.data.length; ++i)
		{
			forecast[i] = smoothings.a[i-1] + smoothings.b[i-1];
		}

		for(var i = this.data.length +1; i < this.data.length + horizon; ++i)
		{
			forecast[i] = forecast[i-1] + smoothings.a[this.data.length-1];
		}

		this.forecast = forecast;
		return forecast;
	}

	getForecast()	{
		if(this.forecast == null)
		{
			return null;
		}
		return this.forecast;
	}

	computeMeanSquaredError() { 
		var SSE = 0.0;
		var n = 0;
		for(var i = 0; i < this.data.length; ++i)
		{
			if(this.data[i] != null && this.forecast[i] != null)
			{
				SSE += Math.pow(this.data[i] - this.forecast[i], 2);	
				n++;
			} 
			
		}
		return 1/(n-1)*SSE;
	};

	optimizeParameter(iter) {
		var incr = 1/iter;
		var bestAlpha = 0.0;
		var bestError = -1;
		this.alpha = bestAlpha;

		while(this.alpha < 1)
		{
			var forecast = this.predict();
			var error = this.computeMeanSquaredError();
			if(error < bestError || bestError == -1)
			{
				bestAlpha = this.alpha;
				bestError = error;
			}
			this.alpha += incr;
		}

		this.alpha = bestAlpha;
		return this.alpha;
	}
}

/*Holt smoothing */
class HoltSmoothing {
	constructor(data, alpha, gamma) {
		if(data == null)
		{
			throw "data parameter is null";
		}
		else if(data.length < 2)
		{
			throw "data doesn't contain enough data to make a prediction";
		}

		if(alpha > 1 || alpha < 0)
		{
			throw "alpha parameter must be between 0 and 1";
		}

		if(gamma > 1 || gamma < 0)
		{
			throw "gamma parameter must be between 0 and 1";
		}

		this.data = data;
		this.alpha = alpha;
		this.gamma = gamma;
		this.forecast = null;
	};

	predict(horizon) {
		var A = Array();
		var B = Array();

		A[0] = 0;
		B[0] = this.data[0];

		for(var i = 1; i < this.data.length; ++i)
		{
			B[i] = this.alpha*this.data[i] + (1-this.alpha)*(B[i-1] + A[i-1]);
			A[i] = this.gamma*(B[i]-B[i-1])+ (1-this.gamma)*A[i-1];
		}

		var forecast = Array();
		forecast[0] = null;
		for(i = 1; i <= this.data.length; ++i)
		{
			forecast[i] = A[i-1] + B[i-1];
		}

		for(i = this.data.length +1; i < this.data.length + horizon; ++i)
		{
			forecast[i] = forecast[i-1] + A[this.data.length - 1];
		} 

		this.forecast = forecast;
		return forecast;
	}

	getForecast() {
		if(this.forecast == null)
		{
			return null;
		}
		return this.forecast;
	}

	computeMeanSquaredError() { 
		var SSE = 0.0;
		var n = 0;
		for(var i = 0; i < this.data.length; ++i)
		{
			if(this.data[i] != null && this.forecast[i] != null)
			{
				SSE += Math.pow(this.data[i] - this.forecast[i], 2);	
				n++;
			} 
			
		}
		return 1/(n-1)*SSE;
	}

	optimizeParameters(iter) {
		var incr = 1/iter;
		var bestAlpha = 0.0;
		var bestError = -1;
		this.alpha = bestAlpha;
		var bestGamma = 0.0;
		this.gamma = bestGamma;

		while(this.alpha < 1)
		{
			while(this.gamma < 1)
			{
				this.predict();
				var error = this.computeMeanSquaredError();
				if(error < bestError || bestError == -1)
				{
					bestAlpha = this.alpha;
					bestGamma = this.gamma;
					bestError = error;
				}
				this.gamma += incr;
			}
			this.gamma = 0;
			this.alpha += incr;
		}

		this.alpha = bestAlpha;
		this.gamma = bestGamma;
		return {"alpha":this.alpha, "gamma":this.gamma};
	}
}

/*Holt Winters smoothing */
class HoltWintersSmoothing {
	
	constructor(data, alpha, gamma, delta, seasonLength, mult) {
		if(data == null)
		{
			throw "data parameter is null";
		}
		else if(data.length < 2)
		{
			throw "data doesn't contain enough data to make a prediction";
		}

		if(alpha > 1 || alpha < 0)
		{
			throw "alpha parameter must be between 0 and 1";
		}

		if(gamma > 1 || gamma < 0)
		{
			throw "gamma parameter must be between 0 and 1";
		}

		if(delta > 1 || delta < 0)
		{
			throw "delta parameter must be between 0 and 1";
		}

		if(seasonLength < 0)
		{
			throw "seasonLength parameter must be a positive integer";
		}

		if(mult != true && mult != false)
		{
			throw "mult parameter must be a boolean";
		}

		this.data = data;
		this.alpha = alpha;
		this.gamma = gamma;
		this.delta = delta;
		this.seasonLength = seasonLength;
		this.mult = mult;
		this.forecast = null;
	};

	predict() {
		if(this.mult)
		{
			return this.predictMult();
		}
		else
		{
			return this.predictAdd();
		}
	}

	predictAdd() {
		var A = Array();
		var B = Array();
		var S = Array();

		A[this.seasonLength-1] = 0;
		var averageFirstSeason = 0;
		for(var i = 0; i < this.seasonLength; ++i)
		{
			averageFirstSeason += this.data[i];
		} 
		B[this.seasonLength-1] = averageFirstSeason/this.seasonLength;

		for(i = 0; i < this.seasonLength; ++i)
		{
			S[i] = this.data[i] - averageFirstSeason/this.seasonLength;
		}

		for(i = this.seasonLength; i < this.data.length; ++i)
		{
			B[i] = this.alpha*(this.data[i]- S[i - this.seasonLength])+(1-this.alpha)*(B[i-1]+A[i-1]);
			A[i] = this.gamma*(B[i]-B[i-1])+(1-this.gamma)*A[i-1];
			S[i] = this.delta*(this.data[i]-B[i])+(1-this.delta)*S[i-this.seasonLength];
		}

		var forecast = Array();
		for(i = 0; i < this.seasonLength; ++i)
		{
			forecast[i]= null;
		}

		for(i = this.seasonLength; i < this.data.length; ++i)
		{
			forecast[i] = A[i-1] + B[i-1] + S[i - this.seasonLength];
		}

		for(i = this.data.length; i < this.data.length + this.seasonLength; ++i)
		{
			forecast[i] = B[this.data.length-1] + (i - this.data.length + 1)*A[this.data.length-1] + S[i - this.seasonLength];
		}

		this.forecast = forecast;
		return forecast;
	}

	predictMult() {
		var A = Array();
		var B = Array();
		var S = Array();

		A[this.seasonLength-1] = 0;
		var averageFirstSeason = 0;
		for(var i = 0; i < this.seasonLength; ++i)
		{
			averageFirstSeason += this.data[i];
		} 
		B[this.seasonLength-1] = averageFirstSeason/this.seasonLength;

		for(i = 0; i < this.seasonLength; ++i)
		{
			S[i] = (this.data[i])/(averageFirstSeason/this.seasonLength);
		}

		for(i = this.seasonLength; i < this.data.length; ++i)
		{
			B[i] = this.alpha*(this.data[i]/S[i - this.seasonLength])+(1-this.alpha)*(B[i-1]+A[i-1]);
			A[i] = this.gamma*(B[i]-B[i-1])+(1-this.gamma)*A[i-1];
			S[i] = this.delta*(this.data[i]/B[i])+(1-this.delta)*S[i-this.seasonLength];
		}

		var forecast = Array();
		for(i = 0; i < this.seasonLength; ++i)
		{
			forecast[i]= null;
		}

		for(i = this.seasonLength; i < this.data.length; ++i)
		{
			forecast[i] = (A[i-1] + B[i-1])*S[i - this.seasonLength];
		}

		for(i = this.data.length; i < this.data.length + this.seasonLength; ++i)
		{
			forecast[i] = (B[this.data.length-1] + (i - this.data.length + 1)*A[this.data.length-1])*S[i -this.seasonLength];
		}

		this.forecast = forecast;
		return forecast;
	}

	getForecast()	{
		if(this.forecast == null)
		{
			this.predict();
		}
		return this.forecast;
	}

	computeMeanSquaredError()	{ 
		var SSE = 0.0;
		var n = 0;
		for(var i = 0; i < this.data.length; ++i)
		{
			if(this.data[i] != null && this.forecast[i] != null)
			{
				SSE += Math.pow(this.data[i] - this.forecast[i], 2);	
				n++;
			} 
			
		}
		return 1/(n-1)*SSE;
	};

	optimizeParameters(iter) {
		var incr = 1/iter;
		var bestAlpha = 0.0;
		var bestError = -1;
		this.alpha = bestAlpha;
		var bestGamma = 0.0;
		this.gamma = bestGamma;
		var bestDelta = 0.0;
		this.delta = bestDelta;

		while(this.alpha < 1)
		{
			while(this.gamma < 1)
			{
				while(this.delta < 1)
				{
					this.predict();
					var error = this.computeMeanSquaredError();
					if(error < bestError || bestError == -1)
					{
						bestAlpha = this.alpha;
						bestGamma = this.gamma;
						bestDelta = this.delta;
						bestError = error;
					}
					this.delta += incr;
				}
				this.delta = 0;
				this.gamma += incr;
			}
			this.gamma = 0;
			this.alpha += incr;
		}

		this.alpha = bestAlpha;
		this.gamma = bestGamma;
		this.delta = bestDelta;
		return {"alpha":this.alpha, "gamma":this.gamma, "delta":this.delta};
	}
}

/*Moving average */

class MovingAverage {

	constructor(data) {
		if(data == null)
		{
			throw "data parameter is null";
		}
		else if(data.length < 3)
		{
			throw "data doesn't contain enough data to make a prediction";
		}

		this.data = data;
	};

	smooth(order) {
		if(order < 1)
		{
			throw "order parameter must be a positive integer";
		}

		var result = Array();

		for(var i = order; i < this.data.length - order ; ++i)
		{
			result[i] = 0;
			for(var j = i - order; j <= i + order; j++)
			{
				result[i] += this.data[j];
			}
			result[i] /= 2*order +1;
		}

		return result;
	}
}

module.exports = {
	SimpleExponentialSmoothing: SimpleExponentialSmoothing,
	DoubleExponentialSmoothing: DoubleExponentialSmoothing,
	HoltSmoothing: HoltSmoothing,
	HoltWintersSmoothing: HoltWintersSmoothing,
	MovingAverage: MovingAverage
}
},{}]},{},[1])(1)
});
