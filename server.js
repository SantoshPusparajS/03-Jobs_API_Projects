import "dotenv/config";
import app from "./app.js";
import dbConnect from "./db/dbConnect.js";

const PORT = process.env.PORT || 4000;
const url = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const start = () => {
  try {
    dbConnect(url);
    app.listen(PORT, () => {
      console.log(`Server is connected at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
