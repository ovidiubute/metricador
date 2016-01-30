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

var assert = require('assert');
var Histogram = require('../src/metrics/histogram');

describe('Histogram', function () {
    describe('#Histogram()', function () {
        it('should return an instance of Histogram', function () {
            var h = new Histogram([0, 3, 4]);
            assert(h instanceof Histogram);
        });

        it('should return an instance of Histogram with default intervals', function () {
            var h = new Histogram();
            assert(h instanceof Histogram);
            assert(Array.isArray(h.getIntervals()));
            assert(h.getIntervals().length > 0);
        });
    });

    describe('#update()', function () {
        it('should add a value in the first range', function () {
            var h = new Histogram([3, 5, 10]);
            assert(h.update(4) == 1);
            assert(h.update(4) == 2);
            assert(h.update(4) == 3);
        });

        it('should add a value in each range', function () {
            var h = new Histogram([3, 5, 9, 10]);
            assert(h.update(4) == 1);
            assert(h.update(6) == 1);
            assert(h.update(9.1) == 1);
        });

        it('should add a value in the Infinity range', function () {
            var h = new Histogram([3, 5, 9, 10]);
            assert(h.update(200) == 1);
            assert(h.update(245) == 2);
            assert(h.update(Math.pow(2, 32)) == 3);
        });

        it('should add a value in the first range if value is below 0', function () {
            var h = new Histogram([3, 5, 9, 10]);
            assert(h.update(4) == 1);
            assert.equal(h.update(-4), 1);
            assert(h.update(-5) == 2);
            assert(h.update(-10) == 3);
            assert(h.update(4) == 2);
        });
    });

    describe('#getIntervals()', function () {
        it('should return default intervals', function () {
            var h = new Histogram();
            assert.deepEqual(h.getIntervals(), [
                [0, 100],
                [100, 250],
                [250, 500],
                [500, 1000],
                [1000, 1500],
                [1500, Infinity]
            ]);
        });
    });

    describe('#getValue()', function () {
        it('should return the internal value for a given interval', function () {
            var h = new Histogram([10, 20, 80]);
            h.update(30);
            h.update(50);
            assert.equal(h.getValue(20, 80), 2);
        });
    });

    describe('#clear', function () {
        it('should set values to 0 from each range', function () {
            var h = new Histogram([3, 5, 9, 10]);
            for (var i = 0; i < 20; i++) {
                h.update(4);
                h.update(9.3);
                h.update(204);
            }
            assert.equal(h.update(4), 21);
            assert.equal(h.update(9.3), 21);
            assert.equal(h.update(204), 21);

            h.clear();

            assert.equal(h.update(4), 1);
            assert.equal(h.update(9.3), 1);
            assert.equal(h.update(204), 1);
        });
    });
});
