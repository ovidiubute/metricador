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
    Gauge = require('./gauge');

/**
 * Counter used to store a single, unsigned, integer value and provide functions to increment or decrement it.
 * @param {number} [initialValue]
 * @constructor
 */
var Counter = function Counter(initialValue) {
    Gauge.call(this, initialValue);
};
util.inherits(Counter, Gauge);

Counter.prototype.incrementAndGet = function (val) {
    this.value += val;

    // Wrap counter if necessary.
    if (this.value > Math.pow(2, 32)) {
        this.value -= (Math.pow(2, 32) + 1);
    }

    return this.value;
};

Counter.prototype.decrementAndGet = function (val) {
    this.value -= val;

    // Prevent counter from being decremented below zero.
    if (this.value < 0) {
        this.value = 0;
    }

    return this.value;
};

module.exports = Counter;
