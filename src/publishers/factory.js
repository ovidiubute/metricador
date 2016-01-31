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

var ConsoleJsonPublisher = require('./console_publisher'),
    GraphitePublisher = require('./graphite_publisher'),
    ZabbixPublisher = require('./zabbix_publisher'),
    JsonFormattingService = require('../reporting/json_formatting_service'),
    formatters = require('../reporting/formatters'),
    graphite = require('graphite'),
    ZabbixSender = require('zabbix-sender'),
    util = require('util');

module.exports = {
    graphite: {
        json: {
            /**
             * Construct a configured publisher that sends data to Graphite Carbon via plaintext protocol.
             * @param {MetricRegistry} metricRegistry Registry where all metrics are stored.
             * @param {string} graphiteServerUrl Hostname of Graphite Carbon
             * @param {number} [graphiteServerPort] Graphite Carbon listening port, by default 2003
             * @return {GraphitePublisher} Graphite publisher instance
             */
            get: function (metricRegistry, graphiteServerUrl, graphiteServerPort) {
                var jfs = new JsonFormattingService(formatters.histogram, formatters.counter);
                var gc = graphite.createClient(util.format('plaintext://%s:%d/', graphiteServerUrl, graphiteServerPort || 2003));
                return new GraphitePublisher(metricRegistry, jfs, gc);
            }
        }
    },
    console: {
        json: {
            /**
             * Construct a default configured publisher that outputs data in JSON format to the standard console.
             * @param {MetricRegistry} metricRegistry Registry where all metrics are stored.
             */
            get: function (metricRegistry) {
                var jfs = new JsonFormattingService(formatters.histogram, formatters.counter);
                return new ConsoleJsonPublisher(metricRegistry, jfs);
            }
        }
    },
    zabbix: {
        json: {
            /**
             * Construct a configured publisher that sends data to Graphite Carbon via plaintext protocol.
             * @param {MetricRegistry} metricRegistry Registry where all metrics are stored.
             * @param {object} zbxConfig Zabbix client configuration
             * @param {string} zbxConfig.hostname Hostname of Zabbix Server
             * @param {string} [zbxConfig.bin] Path to Zabbix Agent binary, by default /usr/bin/zabbix_sender
             * @param {string} [zbxConfig.config] Path to Zabbix Agent configuration, by default /etc/zabbix/zabbix_agentd.conf
             * @param {number} [zbxConfig.port] Zabbix trapper listening port, by default 10051
             */
            get: function (metricRegistry, zbxConfig) {
                var jfs = new JsonFormattingService(formatters.histogram, formatters.counter);
                return new ZabbixPublisher(metricRegistry, jfs, new ZabbixSender(zbxConfig));
            }
        }
    }
};