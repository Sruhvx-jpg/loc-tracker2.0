import { kafkaClient } from "./kafka-client.ts";
import type { Consumer, EachMessagePayload } from "kafkajs";

const initConsumer = async (groupID: string) => {
    const consumer = kafkaClient.consumer({ groupId: groupID })

    await consumer.connect()

    return consumer
}

const ConsumeData = async (
    consumer: Consumer,
    Topic: string,
    handler: (data: any) => Promise<void> | void
) => {
    
    await consumer.subscribe({topic: Topic, fromBeginning: false})

    await consumer.run({
        eachMessage: async({message, heartbeat}: EachMessagePayload ) => {
            if(!message.value) return

            const data  = JSON.parse(message.value.toString())
            await handler(data)
            await heartbeat()
        }
    })
}

export {initConsumer, ConsumeData}