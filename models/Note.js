var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
  // `title` must be of type String
  title: String,
  // `body` must be of type String
  body: String
});

var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
