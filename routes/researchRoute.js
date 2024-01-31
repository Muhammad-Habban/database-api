const express = require("express");
const router = express.Router();
const {getResearchPapers, createResearchPaper, deleteResearchPaper, updateResearchPaper} = require("../controllers/researchPaperController");
const multer = require("multer");
const fileStorageEngine = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "./files");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "--" + file.originalname);
        }
    }
);
const upload = multer({storage: fileStorageEngine});
router.get("/", getResearchPapers)
    .post("/", upload.single("pdf"), createResearchPaper)
    .delete("/", deleteResearchPaper)
    .patch("/", updateResearchPaper);

module.exports = router;