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

var assert = require('assert');
var Gauge = require('../src/metrics/gauge');
describe('Gauge', function () {
    var gauge = null;

    beforeEach(function () {
        gauge = new Gauge();
    });

    describe('#Gauge()', function () {
        it('should return a new object with internal value 0', function () {
            var counter = new Gauge();
            assert.equal(counter.getValue(), 0);
        });

        it('should return a new object with supplied internal value', function () {
            var counter = new Gauge(2578);
            assert.equal(counter.getValue(), 2578);
        });
    });

    describe('#getValue()', function () {
        it('should return current internal value', function () {
            assert.equal(gauge.getValue(), 0);
            gauge.setValue(20);
            assert.equal(gauge.getValue(), 20);
            gauge.setValue(3);
            assert.equal(gauge.getValue(), 3);
        });
    });

    describe('#clear()', function () {
        it('should set internal value to 0', function () {
            assert.equal(gauge.getValue(), 0);
            gauge.setValue(20);
            assert.equal(gauge.getValue(), 20);
            gauge.clear();
            assert.equal(gauge.getValue(), 0);
        });
    });

    describe('#getValue()', function () {
        it('should set current internal value', function () {
            assert.equal(gauge.getValue(), 0);
            gauge.setValue(20);
            assert.equal(gauge.getValue(), 20);
        });
    });
});