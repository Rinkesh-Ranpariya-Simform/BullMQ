import { Queue } from "bullmq";

const emailQueue = new Queue("email-queue", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});

async function init() {
  const res = await emailQueue.add(
    "send-order-confirmation",
    {
      email: "customer@example.com",
      orderId: 1001,
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    },
  );

  console.log("Job added to the queue:", res.id);
}

init();
