const mongoose = require("mongoose");

main()
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chats");
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