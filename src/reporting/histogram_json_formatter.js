/*
 * The MIT License (MIT)
 * Copyright (c) 2015 Ovidiu Bute ovidiu.bute@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 *  and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var util = require('util'),
    MetricJsonFormatter = require('./json_formatter');

/**
 * Specialized formatter that can provide a ready-for-JSON-serialization object given a Histogram input.
 * @constructor
 */
var HistogramJsonFormatter = function () {
    MetricJsonFormatter.call(this);
};
util.inherits(HistogramJsonFormatter, MetricJsonFormatter);

/**
 * Returns an object that is ready to be JSON stringified and included in output
 * @param {object} obj Input data
 * @param {string} obj.name The name of the Counter from the registry
 * @param {Histogram} obj.metric Histogram instance
 * @return {object} Returns an object with one property per histogram interval, and the value is the
 * actual histogram interval's value.
 */
HistogramJsonFormatter.prototype.formatJson = function (obj) {
    var result = Object.create(null);
    obj.metric.getIntervals().forEach(function (interval) {
        var metricIntervalName = util.format('%s.%s_%s',
            obj.name, interval[0], interval[1] == Infinity ? 'Inf' : interval[1]
        );
        result[metricIntervalName] = obj.metric.getValue(interval[0], interval[1]);
    });
    return result;
};

module.exports = HistogramJsonFormatter;