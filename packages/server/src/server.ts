import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./api/router";
import cors from "cors";
import path from "path";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import ws from "ws";

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
  }),
);

// serve static assets normally
app.use(express.static(__dirname + "/dist"));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "dist/index.html"));
});

const server = app.listen(4000);

//websocket stuff

const websocketServer = new ws.Server({
  noServer: true,
  path: "/trpc/socket",
});

const handler = applyWSSHandler({ wss: websocketServer, router: appRouter });

server.on("upgrade", (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    websocketServer.emit("connection", websocket, request);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  websocketServer.close();
  console.log("Server killed, broadcasting reconnect notification");
});

websocketServer.on("connection", (ws) => {
  console.log(`➕➕ Connection (${websocketServer.clients.size})`);
  ws.once("close", () => {
    console.log(`➖➖ Connection (${websocketServer.clients.size})`);
  });
});
