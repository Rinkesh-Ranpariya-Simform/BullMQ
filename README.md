# BullMQ Email Queue

A small BullMQ example that adds an email job to a Redis-backed queue and processes it with a worker.

## Requirements

- Node.js and npm
- Docker

## Run the project

1. Clone the repository and open a terminal in the project directory.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start Redis in a Docker container:

   ```bash
   docker run -itd -p 6379:6379 redis
   ```

4. Open a terminal in the project directory and start the worker:

   ```bash
   node worker.js
   ```

5. In a second terminal, from the project directory, add a job to the queue:

   ```bash
   node producer.js
   ```

The worker will pick up the job and print its processing status. Keep the Redis container and worker running while testing.
