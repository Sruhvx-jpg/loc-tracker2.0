import { Server } from "socket.io"
import { subscriber } from "./redis-connection.ts"

export const initValKeySubscriber = async (io: Server, topic: string) => {
    await subscriber.subscribe(topic)

    subscriber.on('message', (channel, message) => {
        if (channel === 'location-update') {
            const data = JSON.parse(message)

            io.emit('server:location:update', data)
            console.log("data sent to: 'server:location:update'")
        }
        else {
            console.log("subcriber.on error handling remaining")
        }
    })
}