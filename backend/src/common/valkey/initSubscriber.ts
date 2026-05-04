import { Server } from "socket.io"
import { subscriber } from "../common/utils/redis-connection"

export const initValKeySubscriber = async (io: Server) => {
    await subscriber.subscribe('location-updates')

    subscriber.on('message', (channel, message) => {
        if (channel === 'location-updates') {
            const data = JSON.parse(message)

            io.emit('server:location:update', data)
            console.log("data sent to: 'server:location:update'")
        }
        else {
            console.log("subcriber.on error handling remaining")
        }
    })
}