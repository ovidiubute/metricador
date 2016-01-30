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
 * Specialized formatter that can provide a ready-for-JSON-serialization object given a Counter input.
 * @constructor
 */
var CounterJsonFormatter = function () {
    MetricJsonFormatter.call(this);
};
util.inherits(CounterJsonFormatter, MetricJsonFormatter);

/**
 * Returns an object that is ready to be JSON stringified and included in output
 * @param {object} obj Input data
 * @param {string} obj.name The name of the Counter from the registry
 * @param {Counter} obj.metric Counter instance
 * @return {object} Returns an object with just one property, the name of the counter, and the value is the
 * actual counter internal value.
 */
CounterJsonFormatter.prototype.formatJson = function (obj) {
    var result = Object.create(null);
    result[obj.name] = obj.metric.getValue();
    return result;
};

module.exports = CounterJsonFormatter;