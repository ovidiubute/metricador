[![Circle CI](https://circleci.com/gh/ovidiubute/metricador.svg?style=svg)](https://circleci.com/gh/ovidiubute/metricador)
[![codecov.io](https://codecov.io/github/ovidiubute/metricador/coverage.svg?branch=master)](https://codecov.io/github/ovidiubute/metricador?branch=master)
[![david-dm](https://david-dm.org/ovidiubute/metricador.svg)](https://david-dm.org/ovidiubute/metricador.svg)
[![Inline docs](http://inch-ci.org/github/ovidiubute/metricador.svg?branch=master)](http://inch-ci.org/github/ovidiubute/metricador)
[![Code Climate](https://codeclimate.com/github/ovidiubute/metricador/badges/gpa.svg)](https://codeclimate.com/github/ovidiubute/metricador)

# Metricador
Core library to add performance metrics to your Node.js application.

# Usage

Top level of your app:
```javascript
var metricador = require('metricador');

var metricRegistry = metricador.registry;
var metricPublishers = [
  metricador.publishers.console.json.get(registry)
];
var metricReporter = new metricador.Reporter(metricPublishers);
```

Inside one of your app controllers:
```javascript
var metricador = require('metricador');

var metricRegistry = metricador.registry;
var hitCounter = metricRegistry.counter("myapp.controllers.registration.hits");

// ...Business logic...
hitCounter.incrementAndGet();
```

Every 30 seconds the reporter will output something similar to the standard console:
```javascript
{ 'myapp.controllers.registration.hits': 3401 }
```

# License
[MIT](https://github.com/ovidiubute/metricador/blob/master/LICENSE)
