const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    //create relationships one to many
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

module.exports= mongoose.model("Note", noteSchema)