//use mongoose table// 
var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var hiphopSchema = new Schema


var headlineSchema = new schema ({
    title: {
        type: "String",
        unique: true, 
        required: true,
        trim: true
    },

    url: {
        type: "String",
        required: "not a valid url",
        
    },

    summary: {
        type: "String",
        required: true,
        trim: true

    }, 

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },

    saved: {
        type: Boolean,
        default: false,
        
    }
});

var headline = mongoose.model("headline", headlineSchema)