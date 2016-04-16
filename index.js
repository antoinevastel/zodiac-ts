var exports = module.exports = {};

exports.SimpleExponentialSmoothing = function(data, alpha)
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

exports.SimpleExponentialSmoothing.prototype.predict = function()
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

exports.SimpleExponentialSmoothing.prototype.getForecast = function()
{
	if(this.forecast == null)
	{
		this.predict();
	}
	return this.forecast;
}

exports.SimpleExponentialSmoothing.prototype.computeMeanSquaredError = function()
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

exports.SimpleExponentialSmoothing.prototype.optimizeParameter = function(iter)
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