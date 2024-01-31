const express = require("express");
const router = express.Router();
const {getResearchPapers, createResearchPaper, deleteResearchPaper, updateResearchPaper, getCollectionResearchPaper} = require("../controllers/researchPaperController");
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
    .post("/collectionResearchPapers", getCollectionResearchPaper)
    .delete("/", deleteResearchPaper)
    .patch("/", updateResearchPaper);

module.exports = router;