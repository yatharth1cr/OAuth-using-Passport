var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define the schema for User
var userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    photo: { type: String },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("User", userSchema);
