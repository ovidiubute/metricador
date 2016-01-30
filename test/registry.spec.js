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
var MetricRegistry = require('../src/metrics/registry');
var Counter = require('../src/metrics/counter'),
    Gauge = require('../src/metrics/gauge');
describe('MetricRegistry', function () {
    var registry = null;

    beforeEach(function () {
        registry = new MetricRegistry();
    });

    describe('#counter()', function () {
        it('should return a new Counter instance', function () {
            var name = 'Controllers.SignUp.requests.value';
            var c = registry.counter(name);
            assert(c instanceof Counter);
        });

        it('should throw an Error if registering two Counters with the same name', function () {
            var c = new Counter(257);
            var name = 'Controllers.SignUp.requests';
            registry.register(c, name);
            assert.throws(function () {
                registry.register(new Counter(20), name)
            }, Error);
        });
    });

    describe('#gauge()', function () {
        it('should return a new Gauge instance', function () {
            var name = 'memory.free';
            var c = registry.gauge(name);
            assert(c instanceof Gauge);
        });
    });

    describe('#register', function () {
        it('should register a counter instance inside the registry', function () {
            var c = new Counter(257);
            var name = 'Controllers.SignUp.requests';
            registry.register(c, name);
            assert.equal(registry.getMetrics()[name], c);
        });

        it('should throw an Error if registering two metrics with the same name', function () {
            var c = new Counter(257);
            var name = 'Controllers.SignUp.requests';
            registry.register(c, name);
            assert.throws(function () {
                registry.register(new Counter(20), name)
            }, Error);
        });
    });

    describe('#getNames()', function () {
        it('should return all metric names from inside the registry', function () {
            var name2 = 'Controllers.SignUp.requests.value';
            registry.counter(name2);
            var name = 'Controllers.SignIn.requests.value';
            registry.counter(name);

            assert.deepEqual(registry.getNames(), [name2, name]);
        });
    });

    describe('#getMetrics()', function () {
        it('should return the list of all metrics in the registry', function () {
            var name2 = 'Controllers.SignUp.requests.value';
            var c = registry.counter(name2);
            var name = 'Controllers.SignIn.requests.value';
            var c2 = registry.counter(name);

            var metrics = registry.getMetrics();
            assert.equal(metrics[name2], c);
            assert.equal(metrics[name], c2);
        });

        it('should return a sublist of metrics based on a pattern', function () {
            var name2 = 'Controllers.SignUp.requests.value';
            var c = registry.counter(name2);
            var name = 'Controllers.SignIn.requests.value';
            var c2 = registry.counter(name);
            registry.counter('Totally.Not.A.Ctrl.Match');

            var metrics = registry.getMetrics('Controllers');
            assert.equal(Object.keys(metrics).length, 2);
            assert.equal(metrics[name2], c);
            assert.equal(metrics[name], c2);
        });
    });
});