const mongoose = require("mongoose");

const researchPaperSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please provide with the name of the research paper"]
        },
        physicalLocation:{
            type: String
        },
        filePath:{
            type: String,
            required: [true, "Please provide the file path"]
        },
        fileName: {
            type: String
        },
        collectionId:{
          type: mongoose.Types.ObjectId,
          ref: "Collection"
        }
    }
)

module.exports = mongoose.model("ResearchPaper", researchPaperSchema);