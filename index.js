'use strict'

const debug = require('debug')
const EventEmitter = require('events').EventEmitter

module.exports = function plugin (options) {
  return new DebugPlugin(options)
}

class DebugPlugin extends EventEmitter {
  constructor (options) {
    if (!options) options = {}
    super()

    const scope = options.scope || 'telemetry'
    this._debug = {}

    for (const type of ['start', 'ping', 'process', 'publish', 'stop']) {
      this._debug[type] = debug(`${scope}:${type}`)
    }
  }

  start (callback) {
    this._debug.start(new Date().toISOString())
    process.nextTick(callback)
  }

  ping (callback) {
    this._debug.ping(new Date().toISOString())

    // No need to dezalgo ping()
    callback()
  }

  process (metric) {
    this._debug.process('%o', metric)
    this.emit('metric', metric)
  }

  publish (metric) {
    this._debug.publish('%o', metric)
  }

  stop (callback) {
    this._debug.stop(new Date().toISOString())
    process.nextTick(callback)
  }
}
