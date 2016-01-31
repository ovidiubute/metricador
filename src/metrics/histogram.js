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

var DEFAULT_INTERVALS = [0, 100, 250, 500, 1000, 1500, Infinity];

/**
 * A Histogram stores multiple counters within specified closed intervals.
 * Given a value interval of [a, b, c, d], the Histogram will internally store all of values based on the first bucket
 * for which the function: x >= 0 --> a <= x <= b is true. In this example x will be stored in the interval [a, b].
 * Thus the value of the [a, b] interval is now 1. Any subsequent update in the same interval will increment the value.
 * Note that internally the first interval will always be set to [0, a] and the last interval will be set to
 * [x, Infinity].
 *
 * @param {Array} [valueIntervals] The closed intervals on which the values will be stored. A default set of intervals
 * will be set if this parameter is omitted.
 * @constructor
 */
var Histogram = function Histogram(valueIntervals) {
    valueIntervals = valueIntervals || DEFAULT_INTERVALS;

    // Construct intervals
    this._valueIntervals = [];
    for (var i = 0; i < valueIntervals.length - 1; i++) {
        this._valueIntervals.push([valueIntervals[i], valueIntervals[i + 1]]);
    }

    // Pad with 0
    if (this._valueIntervals[0][0] != 0) {
        this._valueIntervals.unshift([0, this._valueIntervals[0][0]]);
    }
    // Pad with Infinity
    if (this._valueIntervals[this._valueIntervals.length - 1][1] != Infinity) {
        this._valueIntervals.push([valueIntervals[valueIntervals.length - 1], Infinity]);
    }

    // Init values
    this._values = this._valueIntervals.map(function () {
        return 0;
    });
};

/**
 * Reset all values back to 0.
 */
Histogram.prototype.clear = function () {
    this._values = this._values.map(function () {
        return 0;
    });
};

/**
 * Return the current intervals.
 * @return {Array} List of intervals in the form of [ [a, b], [b, c], [c, d] ]
 */
Histogram.prototype.getIntervals = function () {
    return this._valueIntervals;
};

/**
 * Update the histogram with a new value.
 * @param {number} value Value to update with
 * @return {number} Returns the internal Histogram value after the new value has been added.
 */
Histogram.prototype.update = function (value) {
    var index = 0;
    for (var i = 0; i < this._valueIntervals.length; i++) {
        index = i;
        if (value <= this._valueIntervals[i][1] && value >= this._valueIntervals[i][0]) {
            index = i;
            break;
        }
    }
    return this._values[index] += 1;
};

/**
 * Returns the value stored within an interval. This interval must already exist on the Histogram.
 * @param {number} intervalLow Left limit of interval
 * @param {number} intervalHigh Right limit of interval
 * @return {number} Histogram value
 * @throws Error If intervalLow is a negative integer
 */
Histogram.prototype.getValue = function (intervalLow, intervalHigh) {
    if (intervalLow < 0) {
        throw new Error('Left limit of interval must be a positive integer!');
    }

    var value = 0;
    var idx = 0,
        self = this,
        notFound = true;
    self._valueIntervals.forEach(function (interval) {
        if (notFound) {
            if (interval[0] >= intervalLow && interval[1] <= intervalHigh) {
                value = self._values[idx];
                notFound = false;
            }
        }

        idx++;
    });

    return value;
};

module.exports = Histogram;
