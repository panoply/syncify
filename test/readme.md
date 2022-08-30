# Syncify Tests

This directory contains the test cases for Syncify. The suite uses the powerful [AVA](#) test runner.

### Test

Run all contained tests

```bash
pnpm test
```

### Runners

<table>
  <thead>
    <tr>
      <th align="left" width="200px">&nbsp;&nbsp;Command</th>
      <th align="left" width="800px">&nbsp;&nbsp;Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>E2E</strong></td>
      <td><i>Edge to Edge test which are running <strong>real world</strong> use cases.</i></td>
    </tr>
    <tr>
      <td><strong>Logs</strong></td>
      <td><i>Test cases for the CLI logger and TUI rendering logic.</i></td>
    </tr>
    <tr>
      <td><strong>Minify</strong></td>
      <td><i>Minification test cases which run snapshot assertions</i></td>
    </tr>
    <tr>
      <td><strong>Paths</strong></td>
      <td><i>Path and URI resolution test cases</i></td>
    </tr>
    <tr>
      <td><strong>Requests</strong></td>
      <td><i>Test assertions for the request client and resources</i></td>
    </tr>
    <tr>
      <td><strong>Transforms</strong></td>
      <td><i>Transform assertion cases that test file augmentations</i></td>
    </tr>
    <tr>
      <td><strong>Units</strong></td>
      <td><i>Various unit based tests</i></td>
    </tr>
    <tr>
      <td><strong>Views</strong></td>
      <td><i>Test cases for view handling and processing</i></td>
    </tr>
  </tbody>
</table>

