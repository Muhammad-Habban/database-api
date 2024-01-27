const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please provide the name"]
    },
    category:{
        type: String,
        required: [true, "Please add the category"]
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the User"]
    }
})

module.exports = mongoose.model("Collection", CollectionSchema);