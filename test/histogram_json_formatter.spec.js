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
    HistogramJsonFormatter = require('../src/reporting/histogram_json_formatter'),
    Histogram = require('../src/metrics/histogram');
describe('HistogramJsonFormatter', function () {
    describe('#format()', function () {
        it('should return a formatted object given a name and a Histogram instance', function () {
            var h = new Histogram([100, 500, 1000]);
            h.update(50);
            h.update(30);
            h.update(750);
            h.update(7023);
            var hjf = new HistogramJsonFormatter();
            assert.deepEqual(hjf.format({
                name: 'controller.response.times',
                metric: h
            }), {
                'controller.response.times.0_100': 2,
                'controller.response.times.100_500': 0,
                'controller.response.times.500_1000': 1,
                'controller.response.times.1000_Inf': 1
            });
        });
    });
});