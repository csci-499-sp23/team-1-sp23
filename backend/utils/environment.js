import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const dbName = process.env.DB_NAME;
const dbURI = process.env.DB_URI;

export { port, dbName, dbURI };
