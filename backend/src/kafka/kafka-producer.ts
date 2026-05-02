import { kafkaClient } from "./kafka-client.ts";

const producer = kafkaClient.producer()

const initProducer = async () => {
    await producer.connect()
    console.log("Producer initialized successfull")
}

const sendLocData = async (topics: string, data: any, socketId: string) => {
    await producer.send({
        topic: topics,
        messages: [{key: data.socketId ,value: JSON.stringify(data)}]
    })
}

export {initProducer, sendLocData}