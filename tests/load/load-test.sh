#!/bin/bash

URL="http://localhost:4200/api/convert-video"
NUM_REQUESTS=1000
FILE_PATH="test.mp4"

echo "Starting Load Test with $NUM_REQUESTS requests to $URL..."

# Send the requests in parallel
for ((i=1; i<=NUM_REQUESTS; i++))
do
  # Send the POST request and capture both the response and the time, in the background
  curl -X POST -F "file=@$FILE_PATH" -s -w "Request $i - Time: %{time_total}s\n" $URL &
done

# Wait for all background processes to complete
wait

echo "Load test completed."
