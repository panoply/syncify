# @syncify/kill

Task execution before `process.exit` operations.

### Installation

```bash
pnpm add @syncify/kill -D
```

# Usage

<!-- prettier-ignore -->
```ts
import { kill, prexit } from '@syncify/kill';

// Process exit tasks
const dispose = kill(() => {

  console.log('Called before process exit fires');

});


dispose() // dispose the hook

kill.exit()  // disposes of all hooks
kill.exit(0) // same as above but process.exit(0) at the end.



// Process exit keypress sequence interception
prexit(async () => {

  console.log('Called before process exit and kill');

  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('Prexit will now trigger process.exit(0)');

});

prexit('id', async () => {

  console.log('Using a custom id for disposal')

})

prexit(async function name() {

  console.log('use a name function for id disposal')

})

prexit.hooks.delete('name') // removed the name hook
prexit.hooks.delete('id') // removed the id hook
```
