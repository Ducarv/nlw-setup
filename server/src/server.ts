// API RESTful
import Fastify from "fastify";
import { PrismaClient } from "@prisma/client"; 
import cors from "@fastify/cors";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get("/habits", async (request, reply) => {
    const habits = await prisma.habit.findMany({
            where: {
                title: {
                    startsWith: "Beber"
                }
            }
        }
    )
    return habits;
})

const start = async () => {
    try {
        await app.listen({ port: 3333 });
        console.log("Server is running");
    } catch (err) {
        app.log.error(err);
    }
}

start();