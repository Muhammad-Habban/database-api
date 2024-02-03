const express = require("express");
const router = express.Router();
const {getAllCollections, getUserCollections, createCollection, updateCollection, deleteCollection} = require("../controllers/collectionController");
const verifyJwt = require("../middleware/verifyJwt");
router.use(verifyJwt);
router.get("/", getAllCollections)
    .post("/userCollections", getUserCollections)
    .post("/", createCollection)
    .delete("/", deleteCollection)
    .patch("/", updateCollection);

module.exports = router;