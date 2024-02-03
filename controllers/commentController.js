const Comment = require("../models/Comment");
const ResearchPaper = require("../models/ResearchPaper");
const getComments = async(req, res) => {
    const comments = await Comment.find({});
    if(!comments || comments.length < 1)
    {
        return res.status(400).json({message: "No comments found"});
    }
    return res.status(200).json({comments, total: comments.length});
}

const getResearchPaperComments = async(req, res) => {
    const {researchPaperId} = req.body;
    if(!researchPaperId)
    {
        return res.status(400).json({message: "Please provide research paper Id"});
    }
    const paper = await ResearchPaper.findOne({_id: researchPaperId});
    if(!paper)
    {
        return res.status(400).json({message: "No Paper with given Id found"});
    }
    const comments = await Comment.find({researchPaperId});
    if(!comments || comments.length < 1)
    {
        return res.status(400).json({message: "No comments for given research paper found"});
    }
    return res.status(200).json({comments, total: comments.length});
}
const createComment = async(req, res) => {
    const {text, researchPaperId} = req.body;
    if(!text || !researchPaperId)
    {
        return res.status(400).json({message: "Please Provide complete information"});
    }
    const paper = await ResearchPaper.findOne({_id: researchPaperId});
    if(!paper)
    {
        return res.status(400).json({message: "No research paper found"});
    }
    const timeStamp = new Date().toLocaleTimeString();
    const newComment = await Comment.create({text, timeStamp, researchPaperId});
    if(!newComment)
    {
        return res.status(500).json({message: "Error while creating new Comment"});
    }
    return res.status(200).json({message: "Comment created successfully", comment: newComment});
}

const updateComment = async(req, res) => {
    const {text, commentId} = req.body;
    if(!commentId)
    {
        return res.status(400).json({message: "Please provide comment Id"});
    }
    if(!text)
    {
        return res.status(400).json({message: "No updated information"});
    }
    const commentExist = await Comment.findOne({_id: commentId});
    if(!commentExist)
    {
        return res.status(400).json({message: "No comment with given Id found"});
    }
    commentExist.text = text;
    commentExist.timeStamp = new Date().toLocaleTimeString();
    await commentExist.save();
    return res.status(200).json({message: "Comment updated successfully", comment: commentExist});
}

const deleteComment = async(req, res) => {
    const {commentId} = req.body;
    if(!commentId)
    {
        return res.status(400).json({message: "Please provide comment Id"});
    }
    const commentExist = await Comment.findOneAndDelete({_id: commentId});
    if(!commentExist)
    {
        return res.status(500).json({message: "Error deleting the comment"});
    }
    return res.status(200).json({message: "Comment Deleted successfully,", comment: commentExist});
}
module.exports = {getComments, createComment, updateComment, deleteComment, getResearchPaperComments};