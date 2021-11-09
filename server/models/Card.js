const { Schema, model } = require("mongoose");

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  position: Number
});

module.exports = Card = model("Card", CardSchema);
