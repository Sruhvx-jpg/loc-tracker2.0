import express from "express"
import http from "http"
import path from "path"
import { Server } from "socket.io"
import { initProducer, sendLocData } from "./src/kafka/kafka-producer.ts"
import { ConsumeData, initConsumer } from "./src/kafka/kafka-consumer.ts"
import { fileURLToPath } from "url"

const main = async () => {
    const app = express()
    const server = http.createServer(app)
    const port = 3000
    const groupID = `SOCKET-SERVER-${port}`
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    //Apache Kafka
    await initProducer()
    const consumer = await initConsumer(groupID)
    await ConsumeData(consumer,
        'location-update',
        (data) => {
            io.except(data.socketId).emit('server:location:update', data)
        }
    )



    //socket.io
    io.on('connection', (socket) => {
        console.log("SOCKET: ", socket.id)

        socket.on('client:location:update', async (clientCoords) => {
            console.log("client coordinates recieved, sending to the producers")

            await sendLocData('location-update', {
                ...clientCoords,
                socketId: socket.id,
                userID: socket.id
            },
            socket.id
            )
        })
    })


    //express 
    app.use(express.static(path.join(__dirname, "../../frontend/locTracker2.0/dist")))
    app.get('/', (req, res) => res.send('Hello World!'))
    server.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

main()