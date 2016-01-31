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

"use strict";

var util = require('util'),
    MetricPublisher = require('./publisher'),
    utility = require('../util/utility');

/**
 * An abstract publisher that serializes metrics to JSON before being sent to services.
 * @param {MetricRegistry} metricRegistry The registry that stores all metrics.
 * @param {JsonFormattingService} jsonFormattingService Service that handles the serialization to JSON
 * @param {function} publishCallback Callback through which metrics are sent via protocol specific implementations
 * The callback takes one parameter, an object with two attributes:
 * 'raw': the pre-serialization representation of all metrics from the registry,
 * 'serialized': the result of calling JSON.stringify on the 'raw' value
 * @constructor
 */
var JsonPublisher = function (metricRegistry, jsonFormattingService, publishCallback) {
    MetricPublisher.call(this, metricRegistry);
    this.jsonFormattingService = jsonFormattingService;
    this.publishCallback = publishCallback;
};
util.inherits(JsonPublisher, MetricPublisher);

/**
 * Publish metrics, effectively serializing metrics from the registry and calling the publishCallback with the data.
 */
JsonPublisher.prototype.publishMetrics = function () {
    var allMetrics = this.metricRegistry.getNames(),
        self = this;
    var result = Object.create(null);
    allMetrics.forEach(function (metricName) {
        result = utility.extend(
            result,
            self.jsonFormattingService.formatMetric(metricName, self.metricRegistry.getMetric(metricName))
        );
    });

    this.publishCallback.call(null, {raw: result, serialized: JSON.stringify(result)});
};

module.exports = JsonPublisher;