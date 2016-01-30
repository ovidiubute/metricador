"use strict";

var util = require('util'),
    Gauge = require('./gauge'),
    Counter = require('./counter'),
    Histogram = require('./histogram');

/**
 * MetricRegistry is responsible for storing and providing access to all metric instances
 * @constructor
 */
var MetricRegistry = function () {
    this._metrics = {};
};

/**
 * Builds a new Counter with the given name and adds it to the registry
 * @param {string} name Name of the Counter
 * @return {Counter} Counter instance
 */
MetricRegistry.prototype.counter = function (name) {
    return this._buildMetric(name, Counter);
};

/**
 * Builds a new Histogram with the given name and adds it to the registry
 * @param {string} name Name of the Histogram
 * @return {Histogram} Histogram instance
 */
MetricRegistry.prototype.histogram = function (name) {
    return this._buildMetric(name, Histogram);
};

/**
 * Builds a new Gauge with the given name and adds it to the registry
 * @param {string} name Name of the Counter
 * @return {Gauge} Gauge instance
 */
MetricRegistry.prototype.gauge = function (name) {
    return this._buildMetric(name, Gauge);
};

MetricRegistry.prototype.getMetric = function (metricName) {
    return this._metrics[metricName];
};

MetricRegistry.prototype.getMetrics = function (metricPattern) {
    if (metricPattern) {
        var self = this;
        var pattern = new RegExp(metricPattern);
        var matchedMetrics = {};
        Object.keys(self._metrics).forEach(function (metricName) {
            if (pattern.test(metricName)) {
                matchedMetrics[metricName] = self._metrics[metricName];
            }
        });

        return matchedMetrics;
    } else {
        return this._metrics;
    }

};

/**
 * Get all metric names contained in the registry
 * @return {Array} List of metric names
 */
MetricRegistry.prototype.getNames = function () {
    return Object.keys(this._metrics);
};

/**
 * Registers metric under provided name in the registry
 * @param metric Metric instance
 * @param {string} name Name of the metric
 * @return The same Metric instance
 * @throws {Error} A metric with the same name has already been registered
 */
MetricRegistry.prototype.register = function (metric, name) {
    if (!this._metrics.hasOwnProperty(name)) {
        this._metrics[name] = metric;
        return metric;
    } else {
        throw new Error(util.format("A metric with the name <%s> has already been registered!", name));
    }
};

MetricRegistry.prototype._buildMetric = function (name, constructor) {
    if (!this._metrics.hasOwnProperty(name)) {
        var c = new constructor();
        this._metrics[name] = c;
        return c;
    } else {
        throw new Error(util.format('A metric with this name <%s> has already been registered!', name));
    }
};

module.exports = MetricRegistry;

