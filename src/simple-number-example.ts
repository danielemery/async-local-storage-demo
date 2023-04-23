import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

let i = 0;
function withRunId() {
  i++;
  asyncLocalStorage.run(i, () => {
    nestedFunction(1);
    nestedFunction(2);
  });
}

function withNoStore() {
  nestedFunction(1);
}

function nestedFunction(arg: number) {
  const runId = asyncLocalStorage.getStore();
  console.log({
    runId,
    arg
  })
}

withRunId();
withRunId();
withNoStore();
