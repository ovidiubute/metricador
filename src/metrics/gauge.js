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

/**
 * A Gauge holds a single, instantaneous value.
 * @param {number} initialValue Initial value
 * @constructor
 */
var Gauge = function(initialValue) {
    this.value = initialValue || 0;
};

/**
 * Set a new value for the Gauge
 * @param {number} newValue New value
 */
Gauge.prototype.setValue = function (newValue) {
    this.value = newValue;
};

/**
 * Return the value of the Gauge
 * @return {number} Gauge value
 */
Gauge.prototype.getValue = function () {
    return this.value;
};

/**
 * Sets the internal value of the Gauge back to 0
 */
Gauge.prototype.clear = function () {
    this.value = 0;
};

module.exports = Gauge;