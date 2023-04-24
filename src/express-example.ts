import { AsyncLocalStorage } from "node:async_hooks";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

export type RequestContext = {
  cid: string;
  randomEnrichment?: string;
};

const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

// In the first middleware, initialise the async local storage
app.use((req, _res, next) => {
  const cid = uuidv4();
  req.cid = cid;
  asyncLocalStorage.run({ cid }, () => {
    next();
  });
});

// In the second middleware, we can modify the existing async local storage
app.use((_req, _res, next) => {
  const context = asyncLocalStorage.getStore() ?? ({} as RequestContext);
  if (Math.random() < 0.5) {
    context.randomEnrichment = "Hello, world!";
  }
  next();
});

app.get("/", (req, res) => {
  exampleLoggerFunction("Serving a request at /");

  exampleServiceFunction();

  res.send(`CID: ${req.cid}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function exampleServiceFunction() {
  exampleLoggerFunction("Performing some business logic!");
}

// Now further down the stack, we can access the async local storage
function exampleLoggerFunction(message: string) {
  const { cid, randomEnrichment } = asyncLocalStorage.getStore() ?? {};
  console.log(`${cid}: ${message} <${randomEnrichment}>`);
}
