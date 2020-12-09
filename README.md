# plugin-debug

> **Log metrics and task lifecycle events with [`debug`](https://github.com/visionmedia/debug), as a processor or publisher.**  
> A [`telemetry`](https://github.com/telemetry-js/telemetry) plugin.

[![npm status](http://img.shields.io/npm/v/@telemetry-js/plugin-debug.svg)](https://www.npmjs.org/package/@telemetry-js/plugin-debug)
[![node](https://img.shields.io/node/v/@telemetry-js/plugin-debug.svg)](https://www.npmjs.org/package/@telemetry-js/plugin-debug)
[![Test](https://github.com/telemetry-js/plugin-debug/workflows/Test/badge.svg?branch=main)](https://github.com/telemetry-js/plugin-debug/actions)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

<details><summary>Click to expand</summary>

- [Usage](#usage)
- [Options](#options)
- [Install](#install)
- [Acknowledgements](#acknowledgements)
- [License](#license)

</details>

## Usage

```js
const telemetry = require('@telemetry-js/telemetry')()
const debug = require('@telemetry-js/plugin-debug')

telemetry.task()
  .process(debug)

  // And/or
  .publish(debug)
```

This plugin can fulfill both the role of processor and publisher. In addition, it can be inserted into a task multiple times, e.g. before and after a certain processor. If you do, set a custom debug scope to differentiate the output.

For example, we can log metrics before they are summarized and when they are published:

```js
const telemetry = require('@telemetry-js/telemetry')()
const osmem = require('@telemetry-js/collector-osmem')
const simple = require('@telemetry-js/schedule-simple')
const summarize = require('@telemetry-js/processor-summarize')
const debug = require('@telemetry-js/plugin-debug')

telemetry.task()
  .collect(osmem)
  .schedule(simple, { interval: '5s' })
  .process(debug, { scope: 'telemetry:process'})
  .process(summarize, { window: '1m' })
  .publish(debug, { scope: 'telemetry:publish'})
```

Debug output can be enabled with the environment variable `DEBUG=telemetry:*` Please see [`debug`](https://github.com/visionmedia/debug) for details.

## Options

_Yet to document._

## Install

With [npm](https://npmjs.org) do:

```
npm install @telemetry-js/plugin-debug
```

## Acknowledgements

This project is kindly sponsored by [Reason Cybersecurity Ltd](https://reasonsecurity.com).

[![reason logo](https://cdn.reasonsecurity.com/github-assets/reason_signature_logo.png)](https://reasonsecurity.com)

## License

[MIT](LICENSE) © Vincent Weevers
