const mongoose = require("mongoose");


const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "admin";
const dbName = process.env.DB_DATABASE || "Chats";

main()
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=admin`);
}

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  mesg: {
    type: String,
    minLength: [5, "mesg to be short"],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports= mongoose.model("Chat", chatSchema);
