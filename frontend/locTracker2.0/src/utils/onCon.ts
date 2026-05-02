import type { Socket } from "socket.io-client"
import type { SocketHandler } from "../customTypes/socketHandlerType.ts"

export const socketConUtil = (
    socket: Socket,
    event: string,
    handler: SocketHandler
) => {
    socket.on(event, handler)

    return () => {socket.off(event, handler)}
}