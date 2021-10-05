const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
  cards: [{
    type: Schema.Types.ObjectId, 
    ref: "Card"
  }],
})

module.exports = User = model("User", UserSchema);