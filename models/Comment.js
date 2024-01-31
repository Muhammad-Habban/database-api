const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        text:{
            type: String
        },
        timeStamp:{
            type: String
        }
    }
)

module.exports = mongoose.model("Comment",commentSchema);