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
    JsonPublisher = require('./json_publisher');

/**
 * Publish metrics to a Zabbix sender.
 * @param {MetricRegistry} metricRegistry The registry that stores all metrics.
 * @param {JsonFormattingService} jsonFormattingService Service that handles the serialization to JSON
 * @param zabbixSender Zabbix Sender
 * @constructor
 */
var ZabbixPublisher = function (metricRegistry, jsonFormattingService, zabbixSender) {
    this.sender = zabbixSender;
    var self = this;
    JsonPublisher.call(this, metricRegistry, jsonFormattingService, function (data) {
        self.sender.send(data.raw, function (err) {
            if (err) {
                console.log('Failed to publish to Zabbix sender. ' + err);
            }
        });
    });
};
util.inherits(ZabbixPublisher, JsonPublisher);

module.exports = ZabbixPublisher;