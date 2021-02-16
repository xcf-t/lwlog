# LwLog

> A lightweight logger implementation


## Usage

**Creating a new logger**

```typescript
import {Logger} from 'lwlog';

const logger = Logger.create();
```

**Attaching the logger to the global object**

This creates the `global.logger` object. To avoid global pollution this is not done by default.

```typescript
import {Logger} from 'lwlog';

Logger.attachGlobal();
```