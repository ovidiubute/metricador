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

/**
 * A reporter instance will periodically ask all publishers to publish the data from their metric registries
 * to their configured endpoint.
 * @param {Array} publishers List of publisher instances
 * @param {number} [runInterval] How often to publish, in milliseconds, defaults to 30 seconds, cannot be lower than 1s
 * @param {function} [runCallback] Callback that is called after each run finishes, by default a noop function is called
 * @constructor
 */
var Reporter = function (publishers, runInterval, runCallback) {
    this._runInterval = (runInterval && runInterval > 1000) ? runInterval : 30000;
    this._isRunning = false;
    this._timer = null;
    this._publishers = publishers;
    this._runCallback = runCallback || function () {};
};

/**
 * Start the Reporter, it will call publishers at configured interval. Can only be called if Reporter is not
 * already running.
 */
Reporter.prototype.start = function () {
    var self = this;

    if (self._isRunning == false) {
        self._isRunning = true;
        self._timer = setInterval(function () {
            self._publishers.forEach(function (publisher) {
                publisher.publishMetrics();
            });
            self._runCallback();
        }, self._runInterval);
    }
};

/**
 * Stop the publish loop. Can only be called on a started Reporter.
 */
Reporter.prototype.stop = function () {
    if (this._isRunning && this._timer) {
        clearInterval(this._timer);
        this._isRunning = false;
        this._timer = null;
    }
};

/**
 * Check if Reporter has started its publish loop
 * @return {boolean} True if Reporter has started, False otherwise
 */
Reporter.prototype.isRunning = function () {
    return this._isRunning;
};

/**
 * Returns the interval at which the publishers are called
 * @return {number} Running interval, in milliseconds
 */
Reporter.prototype.getRunInterval = function () {
    return this._runInterval;
};

module.exports = Reporter;