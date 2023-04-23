import { AsyncLocalStorage } from "node:async_hooks";
import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

export type RequestContext = {
  cid: string;
};

const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

app.use((req, res, next) => {
  const cid = uuidv4();
  (req as any).cid = cid; // TODO add proper express request type merging
  asyncLocalStorage.run({ cid }, () => {
    next();
  });
});

app.get("/", (req: Request, res: Response) => {
  exampleLoggerFunction("Serving a request at /");

  exampleServiceFunction();

  res.send(`CID: ${(req as any).cid}`); // TODO add proper express request type merging
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function exampleServiceFunction() {
  exampleLoggerFunction("Performing some business logic!");
}

function exampleLoggerFunction(message: string) {
  const { cid } = asyncLocalStorage.getStore() ?? {};
  console.log(`${cid}: ${message}`);
}
