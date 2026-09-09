# node-red-contrib-minimum-on-time

A Node-RED node that holds a `true` state for a minimum duration before allowing `false` through.

If `false` arrives before the minimum time has elapsed, it is delayed until the remaining time runs out. If `true` arrives again before that, the pending `false` is cancelled.

## Install

Via the Node-RED editor: **Menu → Manage palette → Install**, then search for `node-red-contrib-minimum-on-time`.

Or from the command line, in your Node-RED user directory (`~/.node-red`, or the mapped volume when running in Docker):

```bash
npm install node-red-contrib-minimum-on-time
```

## Node: `minimum-on-time`

- **Input**: `msg.payload` of `true` or `false`.
- **Output**: `msg.payload` mirrors the input, but a `false` is held back until the minimum on-time has elapsed since the last `true`.
- **Min on-time (ms)**: configurable minimum duration, default `30000` (30s).
