#!/bin/bash

if [ $# -ne 1 ]; then
  echo "❌ Usage: ./fcreate.sh <topic-name>"
  exit 1
fi

TOPIC=$1
BROKER="localhost:9092"

echo "🚀 Creating topic: $TOPIC"

docker exec -it broker /opt/kafka/bin/kafka-topics.sh \
  --create \
  --topic "$TOPIC" \
  --bootstrap-server "$BROKER" \
  --partitions 3 \
  --replication-factor 1 \
  --if-not-exists

echo "✅ Done."