import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const app = express()


app.use(express.json())
app.use(cors())

app.post('/user/:name/:id', async (request, response) => {
    const userId = request.params.id
    const body:any = request.body

    const task = await prisma.task.create({
        data: {
            id: body.id,
            name: body.name,
            done: false,
            userId
        }
    })

    return response.status(201).json(task)
});

app.post('/guest/:name/:id', async (request, response) => {
    const guestId = request.params.id
    const body:any = request.body

    const taskGuest = await prisma.taskGuest.create({
        data: {
            id: body.id,
            name: body.name,
            done: false,
            guestId
        }
    })

    return response.status(201).json(taskGuest)
});

app.post('/newUser', async (request, response) => {
    const body:any = request.body;

    const user = await prisma.user.create({
        data: {
            id: body.id,
            name: body.name,
            email: body.email,
            password: body.password
        }
    })

    return response.status(201).json(user)
});

app.post('/guest', async (request, response) => {
    const body:any = request.body

    const guest = await prisma.guest.create({
        data: {
            id: body.id,
            name: body.name
        }
    })

    return response.status(201).json(guest)
});

app.listen(3333)