import { prisma } from "./lib/prisma";
import { z } from "zod"
import { FastifyInstance } from "fastify";
import dayjs from "dayjs";

export const appRoutes = async (app: FastifyInstance) => {
    app.post("/habits", async (request, reply) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
                // [0, 1, 2, 3, 4, 5, 6] => Domingo, Segunda, Terca, Quarta, Quinta, Sexta, Sabado
            )
        })

        const { title, weekDays } = createHabitBody.parse(request.body);

        const today = dayjs().startOf("day").toDate();

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay,
                        }
                    })
                }
            }
        })
    })

    app.get("/day", async (request, reply) => {
        const getDayParams = z.object({
            date: z.coerce.date(),
        })

        const { date } = getDayParams.parse(request.query);

        const weekDay = dayjs(date).get("day");

        // todos os habitos possiveis
        // todos os habitos completados

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,                  
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })

        return possibleHabits;
    })
}