var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    username: { type: String },
    photo: { type: String },
    googleId: { type: String }, // Store Google ID
    githubId: { type: String }, // Store GitHub ID
    provider: { type: String },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("User", userSchema);
