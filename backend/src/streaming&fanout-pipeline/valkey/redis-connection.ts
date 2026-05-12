import Redis from "ioredis";

function createRedisServer() {
    return new Redis({
        host: "localhost",
        port: 6379,
        password: "redispassword",
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        maxRetriesPerRequest: null,
        enableReadyCheck: false
    })
}

export  const publisher = createRedisServer()
export const subscriber = createRedisServer()

// Add error handlers
publisher.on('error', (err) => {
    console.error('[Redis Publisher] Connection error:', err.message);
});

publisher.on('connect', () => {
    console.log('[Redis Publisher] Connected successfully');
});

subscriber.on('error', (err) => {
    console.error('[Redis Subscriber] Connection error:', err.message);
});

subscriber.on('connect', () => {
    console.log('[Redis Subscriber] Connected successfully');
});