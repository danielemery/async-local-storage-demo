# Async Local Storage Demo

Code example to go along with a short presentation on the node async local storage api.

Async local storage was first added in node 12.17.0 as an experimental feature. It was made stable in node v16.4.0.

## Simple Number Example

Simple example storing a counter in async local storage and incrementing it on each call.

```
npm run simple-number-example
```

## Express Example

Example using async local storage with express. Stores the request id in async local storage and appends it to all logs.

```
npm run express-example
```

## Multiple Instance Example

Example using multiple instances of async local storage.

```
npm run multiple-instance-example
```
