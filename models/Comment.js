const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        text:{
            type: String
        },
        timeStamp:{
            type: String
        },
        researchPaperId:{
            type: mongoose.Types.ObjectId,
            ref: "ResearchPaper"
        }
    }
)

module.exports = mongoose.model("Comment",commentSchema);