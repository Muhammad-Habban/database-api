const express = require("express");
const {getComments, createComment, getResearchPaperComments, updateComment, deleteComment} = require("../controllers/commentController");
const router = express.Router();
const verifyJwt = require("../middleware/verifyJwt");
router.use(verifyJwt);
router.get("/", getComments)
    .post("/", createComment)
    .post("/researchPaperComments", getResearchPaperComments)
    .patch("/", updateComment)
    .delete("/", deleteComment);

module.exports = router;