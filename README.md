[![CircleCI](https://img.shields.io/circleci/project/ovidiubute/metricador.svg)](https://img.shields.io/circleci/project/ovidiubute/metricador.svg)
[![codecov.io](https://codecov.io/github/ovidiubute/metricador/coverage.svg?branch=master)](https://codecov.io/github/ovidiubute/metricador?branch=master)
[![david-dm](https://david-dm.org/ovidiubute/metricador.svg)](https://david-dm.org/ovidiubute/metricador.svg)
[![Inline docs](http://inch-ci.org/github/ovidiubute/metricador.svg?branch=master)](http://inch-ci.org/github/ovidiubute/metricador)
[![Code Climate](https://codeclimate.com/github/ovidiubute/metricador/badges/gpa.svg)](https://codeclimate.com/github/ovidiubute/metricador)

# Metricador
Core library to add performance metrics to your Node.js application. Supports using metric implementations
such as Counters and Histograms to send data over to specialized backends (such as Graphite).

# Usage

Top level of your app:
```javascript
var metricador = require('metricador');

var metricRegistry = metricador.registry;
var metricPublishers = [
  metricador.publishers.console.json.get(registry),
  metricador.publishers.graphite.json.get(registry, '<hostname_or_ip_of_Graphite_server>')
];
var metricReporter = new metricador.Reporter(metricPublishers);
```

Inside one of your app controllers:
```javascript
var metricador = require('metricador');

var metricRegistry = metricador.registry;
var hitCounter = metricRegistry.counter("myapp.controllers.registration.hits");
var responseTimes = metricRegistry.histogram("myapp.controllers.registration.responsetimes");

// ...Business logic...
hitCounter.incrementAndGet();
responseTimes.update(timeElapsed);
```

Every 30 seconds the reporter will output something similar to the standard console:
```javascript
{
  'myapp.controllers.registration.hits': 3401,
  'myapp.controllers.registration.responsetimes.0_100': 2001,
  'myapp.controllers.registration.responsetimes.100_250': 2400,
  'myapp.controllers.registration.responsetimes.250_500': 230,
  'myapp.controllers.registration.responsetimes.500_1000': 20,
  'myapp.controllers.registration.responsetimes.1000_1500': 1,
  'myapp.controllers.registration.responsetimes.1500_Inf': 3
}
```
Since we registered a Graphite publisher it will also send the data to the Graphite server for plotting.

# License
[MIT](https://github.com/ovidiubute/metricador/blob/master/LICENSE)
