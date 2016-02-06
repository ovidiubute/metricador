[![Circle CI](https://circleci.com/gh/ovidiubute/metricador.svg?style=svg)](https://circleci.com/gh/ovidiubute/metricador)
[![codecov.io](https://codecov.io/github/ovidiubute/metricador/coverage.svg?branch=master)](https://codecov.io/github/ovidiubute/metricador?branch=master)

# Metricador
Core library to add performance metrics to your Node.js application.

# Usage

```javascript
// Top level of your app
var metricador = require('metricador');

var metricRegistry = metricador.registry;
var metricPublishers = [
  metricador.publishers.console.json.get(registry)
];
var metricReporter = new metricador.Reporter(metricPublishers);

// Inside a controller
var metricador = require('metricador');

var metricRegistry = metricador.registry;
var hitCounter = metricRegistry.counter("myapp.controllers.registration.hits");

// ...Business logic...
hitCounter.incrementAndGet();
```

# License
[MIT](https://github.com/ovidiubute/metricador/blob/master/LICENSE)