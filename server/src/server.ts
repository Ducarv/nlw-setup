// API RESTful
import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from './routes';

const app = Fastify();


app.register(cors);
app.register(appRoutes);

const start = async () => {
    try {
        await app.listen({ port: 3333 });
        console.log("Server is running");
    } catch (err) {
        app.log.error(err);
    }
}

start();