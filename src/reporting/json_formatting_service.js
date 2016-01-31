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

var Gauge = require('../metrics/gauge'),
    Histogram = require('../metrics/histogram');

/**
 * This service reunites all metric specific JSON formatters and provides an easy function call to
 * instantly format any metric to the desired format.
 * @param {MetricJsonFormatter} histogramJsonFormatter
 * @param {MetricJsonFormatter} gaugeJsonFormatter
 * @constructor
 */
var JsonFormattingService = function (histogramJsonFormatter, gaugeJsonFormatter) {
    this._formatters = {
        'Histogram': histogramJsonFormatter,
        'Gauge': gaugeJsonFormatter
    }
};

/**
 * Format a compatible metric to a JSON ready object.
 * @param metricName Name of the metric as specified in a registry
 * @param metricInstance Instance of Metric
 * @return {object} A JSON serialization ready object where the keys are the names of the metrics and the values
 * are the internal values
 */
JsonFormattingService.prototype.formatMetric = function (metricName, metricInstance) {
    var input = {
        name: metricName,
        metric: metricInstance
    };
    if (metricInstance instanceof Gauge) {
        return this._formatters['Gauge'].format(input);
    } else if (metricInstance instanceof Histogram) {
        return this._formatters['Histogram'].format(input);
    }
};

module.exports = JsonFormattingService;