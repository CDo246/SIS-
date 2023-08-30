import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./api/router";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: ".env" });
dotenv.config({ path: "../../.env" });

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(4000);
console.log("hi");

