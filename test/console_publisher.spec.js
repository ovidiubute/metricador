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

var assert = require('assert'),
    JsonFormattingService = require('../src/reporting/json_formatting_service'),
    HistogramJsonFormatter = require('../src/reporting/histogram_json_formatter'),
    GaugeJsonFormatter = require('../src/reporting/counter_json_formatter'),
    MetricRegistry = require('../src/metrics/registry'),
    ConsoleJsonPublisher = require('../src/publishers/console_publisher');
describe('JsonPublisher', function () {
    var publisher = null;
    var registry = null;
    var jsonService = null;

    beforeEach(function () {
        registry = new MetricRegistry();
        jsonService = new JsonFormattingService(new HistogramJsonFormatter(), new GaugeJsonFormatter());

        registry.counter('Namespace.B.hits');
        registry.counter('Namespace.C.hits');
        registry.histogram('Controller.XYZ.response.times');
        publisher = new ConsoleJsonPublisher(registry, jsonService);
    });

    describe('#publishMetrics()', function () {
        it('should publish all registered metrics with a JSON serialized callback', function () {
            var data;
            var publisher = new ConsoleJsonPublisher(registry, jsonService, function (input) {
                data = input.serialized;
            });

            publisher.publishMetrics();

            assert.equal(data, JSON.stringify({
                "Namespace.B.hits": 0,
                "Namespace.C.hits": 0,
                "Controller.XYZ.response.times.0_100": 0,
                "Controller.XYZ.response.times.100_250": 0,
                "Controller.XYZ.response.times.250_500": 0,
                "Controller.XYZ.response.times.500_1000": 0,
                "Controller.XYZ.response.times.1000_1500": 0,
                "Controller.XYZ.response.times.1500_Inf": 0
            }));
        });

        it('should publish all registered metrics with an object callback', function () {
            var data;
            var publisher = new ConsoleJsonPublisher(registry, jsonService, function (input) {
                data = input.raw;
            });

            publisher.publishMetrics();

            assert.deepEqual(data, {
                "Namespace.B.hits": 0,
                "Namespace.C.hits": 0,
                "Controller.XYZ.response.times.0_100": 0,
                "Controller.XYZ.response.times.100_250": 0,
                "Controller.XYZ.response.times.250_500": 0,
                "Controller.XYZ.response.times.500_1000": 0,
                "Controller.XYZ.response.times.1000_1500": 0,
                "Controller.XYZ.response.times.1500_Inf": 0
            });
        });
    });
});