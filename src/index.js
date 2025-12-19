import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Application error", err);
      process.exit(1);
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log(`server is running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.log("Mongoose DB connection failed !!!", err);
    process.exit(1);
  });
