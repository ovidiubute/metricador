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

Histogram.prototype.clear = function () {
    this._values.fill(0);
};

Histogram.prototype.getIntervals = function () {
    return this._valueIntervals;
};

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

Histogram.prototype.getValue = function (intervalLow, intervalHigh) {
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
