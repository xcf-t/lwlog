# LwLog

> A lightweight logger implementation


## Usage

##### Creating a new logger Instance

```javascript
import {Logger} from 'lwlog';

const logger = Logger.create();

logger.info("Hello world");
// Hello World
```

##### Scoping a logger

A scope is a categories for a specific logger instance that is supposed to help with readability.

```javascript
import {Logger} from 'lwlog';

const logger = Logger.create("Application", "Webserver");

logger.info("Hello World");
// [Application][Webserver] Hello World
```

Logger instances can also be scoped inline:

```javascript
import {Logger} from 'lwlog';

const logger = Logger.create("Application");

logger.info("Hello World");
// [Application] Hello World

logger.scope("Webserver").info("Hello World");
// [Application][Webserver] Hello World
```

##### Attaching the logger to the global object

This creates the `global.logger` object. To avoid global pollution this is not done by default.

```javascript
import {Logger} from 'lwlog';

Logger.attachGlobal();
```