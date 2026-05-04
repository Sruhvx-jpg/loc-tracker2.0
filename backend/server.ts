import express from "express"
import http from "http"
import path from "path"
import { Server } from "socket.io"
import { initProducer, sendLocData } from "./src/streaming&fanout pipeline/kafka/kafka-producer.ts"
import { ConsumeData, initConsumer } from "./src/streaming&fanout pipeline/kafka/kafka-consumer.ts"
import { fileURLToPath } from "url"
import { publisher, subscriber } from "./src/streaming&fanout pipeline/valkey/redis-connection.ts"
import { initValKeySubscriber } from "./src/streaming&fanout pipeline/valkey/initSubscriber.ts"
import connectDB from "./src/Database/db.ts"


const main = async () => {
    const app = express()
    const server = http.createServer(app)
    const port = 3000
    const groupID = `SOCKET-SERVER-${port}`
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    //mongoose
    await connectDB()

    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    //valkey subscriber
    try {
        await subscriber.subscribe('location-updates')
        console.log('[Redis] Subscribed to location-updates')
    } catch (error) {
        console.error('[Redis] Failed to subscribe:', error)
    }

    initValKeySubscriber(io)


    subscriber.on('error', (error) => {
        console.error('[Redis Subscriber] Error:', error.message)
    })

    //Apache Kafka
    try {
        await initProducer()
        console.log('[Kafka] Producer initialized')
    } catch (error) {
        console.error('[Kafka] Failed to initialize producer:', error)
    }

    try {
        const consumer = await initConsumer(groupID)
        await ConsumeData(consumer,
            'location-update',
            (data) => {
                console.log("coordinates recieved: streaming would be handled by valkey")
            }
        )
    } catch (error) {
        console.error('[Kafka] Failed to initialize consumer:', error)
    }



    //socket.io
    io.on('connection', async (socket) => {
        console.log("SOCKET: ", socket.id)

        const keys = await publisher.keys("user:*")

        for (const key of keys) {
            const data = await publisher.hgetall(key)
            const payload = {
                userID: key.split(":")[1],
                lat: parseFloat(data.lat),
                lng: parseFloat(data.lng)
            }

            socket.emit('server:location:update', payload)
        }


        socket.on('client:location:update', async (clientCoords) => {
            console.log("client coordinates recieved: ", {clientCoords})
            const payload = {
                ...clientCoords,
                socketId: socket.id,
                userID: socket.id,
            }

            try {
                await publisher.hset(
                    `user:${payload.userID}`,
                    "lat", payload.lat,
                    "lng", payload.lng
                );

                await publisher.publish(
                    "location-updates",
                    JSON.stringify(payload)
                );
            } catch (error) {
                console.error('[Redis] Error storing/publishing location:', error)
            }

            try {
                await sendLocData('location-update', payload, socket.id)
            } catch (error) {
                console.error('[Kafka] Error sending location data:', error)
            }
        })

        socket.on('disconnect', async () => {
            console.log("SOCKET DISCONNECTED: ", socket.id)

            try {
                await publisher.del(`user:${socket.id}`)

                await publisher.publish(
                    'location-updates',
                    JSON.stringify({
                        userID: socket.id,
                        disconnected: true
                    })
                )
            } catch (error) {
                console.error('[Redis] Error handling disconnect:', error)
            }
        })
    })


    //express 
    app.use(express.static(path.join(__dirname, "../../frontend/locTracker2.0/dist")))
    app.get('/', (req, res) => res.send('Hello World!'))
    server.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

main()