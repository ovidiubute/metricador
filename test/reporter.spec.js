/*
 * The MIT License (MIT)
 * Copyright (c) 2016 Ovidiu Bute ovidiu.bute@gmail.com
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

var Reporter = require('../src/reporting/reporter'),
    ConsolePublisher = require('../src/publishers/console_publisher'),
    sinon = require('sinon'),
    assert = require('assert');
describe('Reporter', function () {
    var publisher1 = sinon.stub();
    var publisher2 = sinon.stub();
    var clock;

    beforeEach(function () {
        clock = sinon.useFakeTimers();
    });

    describe("#Reporter()", function () {
        it("should construct a stopped instance with associated publishers and default config", function () {
            var r = new Reporter([publisher1, publisher2]);

            assert(r instanceof Reporter);
            assert.equal(r.isRunning(), false);
        });

        it("should construct a stopped instance with associated publishers and custom config", function () {
            var r = new Reporter([publisher1, publisher2], 60000);

            assert(r instanceof Reporter);
            assert.equal(r.isRunning(), false);
            assert.equal(r.getRunInterval(), 60000);
        });

        it('should not allow construction of an instance with runInterval less than 1s', function () {
            var r = new Reporter([publisher1, publisher2], 20);

            assert(r instanceof Reporter);
            assert.equal(r.isRunning(), false);
            assert.equal(r.getRunInterval(), 30000);
        });
    });

    describe("#start()", function () {
        it("should start the publishing loop", function () {
            var r = new Reporter([publisher1, publisher2], 60000);
            assert.equal(r.isRunning(), false);

            r.start();
            assert.equal(r.isRunning(), true);
        });

        it("should not start the loop if it has already been started", function () {
            var r = new Reporter([publisher1, publisher2], 60000);

            r.start();
            var oldTimer = r._timer;
            r.start();
            assert.equal(r._timer, oldTimer);
        });

        it('should publish metrics based on the supplied interval', function () {
            var publisherMock = {
                publishMetrics: function () {}
            };
            var publishMetricsSpy = sinon.spy(publisherMock, "publishMetrics");

            var r = new Reporter([publisherMock, publisherMock], 30000);
            r.start();
            clock.tick(60010);

            var spyCall = publishMetricsSpy.callCount;
            assert.equal(spyCall, 4);
        });
    });

    describe('#stop()', function () {
        it("should stop the publishing loop", function () {
            var r = new Reporter([publisher1, publisher2], 60000);

            r.start();
            assert.equal(r.isRunning(), true);
            r.stop();
            assert.equal(r.isRunning(), false);
        });

        it("should not stop the loop if it has already been stopped", function () {
            var r = new Reporter([publisher1, publisher2], 60000);

            r.start();
            r.stop();
            assert.equal(r._timer, null);
        });
    });
});