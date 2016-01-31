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
    JsonPublisher = require('./json_publisher');

/**
 * This publisher writes to the console as an extension to the Json publisher. It writes all metrics in
 * JSON representation.
 * @param {MetricRegistry} metricRegistry Registry that holds all the metrics
 * @param {JsonFormattingService} jsonFormattingService Service that handles the serialization of the metrics
 * @param {function} [publishCallback] The callback that is used to write the data. This defaults to console.log(data)
 * but it can be replaced with anything. Useful during unit-tests.
 * @constructor
 */
var ConsoleJsonPublisher = function (metricRegistry, jsonFormattingService, publishCallback) {
    JsonPublisher.call(this, metricRegistry, jsonFormattingService, publishCallback || function (data) {
        console.log(data.serialized);
    });
};
util.inherits(ConsoleJsonPublisher, JsonPublisher);

module.exports = ConsoleJsonPublisher;