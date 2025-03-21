---
title: 'CLI - sy projects'
layout: base
permalink: '/cli/sy-projects/index.html'
---

# `sy projects`

Displays information about all known Syncify projects stored on the device. Syncify maintains a persistent hard cache in the operating system's home directory (e.g., `~/.syncify/`), which stores project metadata locally. When executed, the command reads and presents this cached data. You can optionally provide a specific project directory name as an argument to retrieve detailed information about that project alone, bypassing the full list.

```bash
$ sy projects           # Shows all projects
$ sy projects <name>    # Shows details for project <name>
```

---
