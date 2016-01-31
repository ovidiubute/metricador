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
var Counter = require('../src/metrics/counter');
describe('Counter', function () {
    var counter = null;

    beforeEach(function () {
        counter = new Counter();
    });

    describe('#Counter()', function () {
        it('should return a new object with internal value 0', function () {
            var counter = new Counter();
            assert.equal(counter.getValue(), 0);
        });

        it('should return a new object with supplied internal value', function () {
            var counter = new Counter(2578);
            assert.equal(counter.getValue(), 2578);
        });
    });

    describe('#getValue()', function () {
        it('should return current internal value', function () {
            assert.equal(counter.getValue(), 0);
            counter.incrementAndGet(20);
            assert.equal(counter.getValue(), 20);
            counter.decrementAndGet(3);
            assert.equal(counter.getValue(), 17);
        });
    });

    describe('#incrementAndGet()', function () {
        it('should increment its interval value by 1', function () {
            assert.equal(counter.incrementAndGet(), 1);
            assert.equal(counter.incrementAndGet(), 2);
        });

        it('should increment its internal value by the provided amount', function () {
            assert.equal(counter.incrementAndGet(5), 5);
            assert.equal(counter.incrementAndGet(5), 10);
        });

        it('should not increment its internal value past 2^32', function () {
            assert.equal(counter.incrementAndGet(Math.pow(2, 32)), Math.pow(2, 32));
            assert.equal(counter.incrementAndGet(1), 0);
        });
    });

    describe('#decrementAndGet()', function () {
        it('should not decrement its internal value below 0', function () {
            assert.equal(counter.decrementAndGet(3), 0);
            assert.equal(counter.incrementAndGet(10), 10);
            assert.equal(counter.decrementAndGet(10), 0);
            assert.equal(counter.decrementAndGet(3), 0);
        });

        it('should decrement its interval value by 1', function () {
            counter.incrementAndGet(5);
            assert.equal(counter.decrementAndGet(), 4);
            assert.equal(counter.decrementAndGet(), 3);
        });

        it('should decrement its internal value by the provided amount', function () {
            counter.incrementAndGet(5);
            assert.equal(counter.decrementAndGet(3), 2);
            assert.equal(counter.decrementAndGet(1), 1);
        });
    });
});