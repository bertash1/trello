const { Schema, model } = require("mongoose");

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, ref: "User",
  },
});

module.exports = Card = model("Card", CardSchema);
