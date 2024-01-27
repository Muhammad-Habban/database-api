const express = require("express");
const router = express.Router();
const {getAllCollections, getUserCollections, createCollection, updateCollection, deleteCollection} = require("../controllers/collectionController");
router.get("/", getAllCollections)
    .post("/userCollections", getUserCollections)
    .post("/", createCollection)
    .delete("/", deleteCollection)
    .patch("/", updateCollection);

module.exports = router;