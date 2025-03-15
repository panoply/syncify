# @syncify/timer

Timing utility which keeps a readable execution elapse.

### Installation

```bash
$ pnpm add @syncify/timer -D
```

# Usage

The module keeps maintains timing operations using the `performance` perf hook. Each timer is tracked with a customer identifier or provided identifier.

<!-- prettier-ignore -->
```ts
import { timer } from '@syncify/timer'

// PUBLIC API

timer.start()       // Captures the current timestamp and applies it to the mark model.
timer.stop()        // Stops the timer and returns the execution time as a string (accepts params)
timer.sec()         // Returns elapsed seconds, (accepts 'id' param)
timer.pause()       // Pauses a timer and sets it into cache, use now() to retreive (accepts 'id' param)
timer.now()         // Sugar for the `stop()` function, returns elapsed time (accepts 'id' param)
timer.clear()       // Removes all the timing references from the mark model (accepts 'id' param)

// INTERNAL USE

timer.marks       // Holds reference to different running timers
timer.time        // Similar to `mark[]` but provides identifer timers
timer.cache       // Used to stop a timer but maintain a reference.
```

# Contributing

This package is designed for usage within [Syncify](https://syncify.sh). Contributions are not accepted unless they pertain to the core Syncify module. If contributions fall into that category, fork the Syncify project.
