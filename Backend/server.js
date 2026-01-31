import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Server Error: ", err);
      throw err;
    });
    app.listen(process.env.PORT, () => {
      console.log(
        `\n Server running on port: http://localhost:${process.env.PORT}`,
      );
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB: ", error);
  });
