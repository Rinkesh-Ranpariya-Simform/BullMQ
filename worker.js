import { Worker } from "bullmq";

const sendEmail = (job) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (job.id !== "3") {
        console.log("Email sent successfully for order:", job.data.orderId);
        resolve();
      } else {
        console.error("Failed to send email for order:", job.data.orderId);
        reject(new Error("Email sending failed"));
      }
    }, 5 * 1000);
  });

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log("Processing job:", job.id);
    console.log("Sending email to:", job.data.email);
    await sendEmail(job);
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed`, error);
});
