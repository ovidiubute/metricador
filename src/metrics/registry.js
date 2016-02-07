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
 * Builds a new Counter with the given name and adds it to the registry OR returns
 * an already registered Counter with the given name.
 * @param {string} name Name of the Counter
 * @return {Counter} Counter instance
 */
MetricRegistry.prototype.counter = function (name) {
    return this._buildMetric(name, Counter);
};

/**
 * Builds a new Histogram with the given name and adds it to the registry OR returns
 * an already registered Histogram with the given name.
 * @param {string} name Name of the Histogram
 * @return {Histogram} Histogram instance
 */
MetricRegistry.prototype.histogram = function (name) {
    return this._buildMetric(name, Histogram);
};

/**
 * Builds a new Gauge with the given name and adds it to the registry OR returns
 * an already registered Gauge with the given name.
 * @param {string} name Name of the Counter
 * @return {Gauge} Gauge instance
 */
MetricRegistry.prototype.gauge = function (name) {
    return this._buildMetric(name, Gauge);
};

/**
 * Gets one single Metric from the registry by provided name.
 * @param metricName Name of the Metric
 * @return {object|undefined} Metric instance, undefined if not found
 */
MetricRegistry.prototype.getMetric = function (metricName) {
    return this._metrics[metricName];
};

/**
 * Get metrics from the registry, optionally filtered by a name pattern.
 * @param {string} [metricPattern] Name pattern to search for metrics
 * @return {object} Dictionary where the key is the metric name and the value is the actual Metric instance
 */
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

/**
 * Internal function used to construct new Metric instances and register them to the Registry.
 * @param {string} name Metric name
 * @param {function} constructor Metric constructor function
 * @return {object} Metric instance
 * @private
 */
MetricRegistry.prototype._buildMetric = function (name, constructor) {
    if (!this._metrics.hasOwnProperty(name)) {
        var c = new constructor();
        this._metrics[name] = c;
        return c;
    } else {
        return this._metrics[name];
    }
};

module.exports = MetricRegistry;

