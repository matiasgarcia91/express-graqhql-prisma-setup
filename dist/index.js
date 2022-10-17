import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
dotenv.config();
async function startServer() {
    const app = express();
    const PORT = process.env.PORT;
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    app.use("/graphql", cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => ({ token: "hola" }),
    }));
    app.get("/hello", (req, res) => {
        res.send("Hello");
    });
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/`);
}
startServer();
//# sourceMappingURL=index.js.map