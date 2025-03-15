---
title: 'CLI - sy prune'
layout: base
permalink: '/cli/sy-prune/index.html'
---

# `sy prune`

Syncify generates a persistent cache storage to help optimize performance during subsequent runs. The `prune` flag can be used to remove this auto-generated cache. Syncify will regenerate caches when none exist and it is recommended to run `sy prune` every so often to keep caches from becoming stale.

```bash
$ sy prune  # Does not accept flags and runs in isolation
```
