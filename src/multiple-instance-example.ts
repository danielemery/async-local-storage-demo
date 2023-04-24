import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorageOuter = new AsyncLocalStorage();
const asyncLocalStorageInner = new AsyncLocalStorage();

let i = 0;
let j = 100;
function withRunId() {
  asyncLocalStorageOuter.run(i++, () => {
    asyncLocalStorageInner.run(j++, () => {
      nestedFunction(1);
      nestedFunction(2);
    });
  });
}

function withNoStore() {
  nestedFunction(1);
}

function nestedFunction(arg: number) {
  const outerId = asyncLocalStorageOuter.getStore();
  const innerId = asyncLocalStorageInner.getStore();
  console.log({
    outerId,
    innerId,
    arg,
  });
}

withRunId();
withRunId();
withNoStore();
