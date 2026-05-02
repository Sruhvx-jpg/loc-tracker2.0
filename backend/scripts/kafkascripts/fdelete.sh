#!/bin/bash

ACTION=$1
TYPE=$2
TOPIC=$3

BROKER="localhost:9092"

if [ "$TYPE" != "topics" ]; then
  echo "❌ Usage:"
  echo "fdelete topics <topic-name>"
  exit 1
fi

if [ -z "$TOPIC" ]; then
  echo "❌ Topic name required"
  exit 1
fi

echo "⚠️ You are about to delete topic: $TOPIC"
read -p "Are you sure? (y/n): " confirm

if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "❌ Cancelled."
  exit 0
fi

echo "🗑️ Deleting topic: $TOPIC"

docker exec -it broker /opt/kafka/bin/kafka-topics.sh \
  --delete \
  --topic "$TOPIC" \
  --bootstrap-server localhost:9092

echo "✅ Done."