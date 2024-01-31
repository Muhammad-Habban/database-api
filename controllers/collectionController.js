const Collection = require("../models/Collection");
const User = require("../models/User");

const getAllCollections = async(req, res)=> {
    const collections = await Collection.find({}).populate("user");
    if(!collections || collections.length < 1)
    {
        return res.status(400).json({message: "No collections found"});
    }
    return res.status(200).json({collections, total: collections.length});
}
const createCollection = async(req, res)=> {
    const {name, category, userId} = req.body;
    if(!name || !category || !userId){
        return res.status(400).json({message: "Please provide all the information"});
    }
    const userExist = await User.findOne({_id: userId});
    if(!userExist)
    {
        return res.status(400).json({message: "No user with given id exists"});
    }
    const newCollection = await Collection.create({
        name,
        category,
        user: userId
    });
    return res.status(200).json({message: "Collection Created Successfully", collection: newCollection});
}

const deleteCollection = async(req, res) => {
    const {collectionId} = req.body;
    const collectionExist = await Collection.findOneAndDelete({_id: collectionId});
    if(!collectionExist)
    {
        return res.status(400).json({message: "No Collection found with this id"});
    }
    return res.status(200).json({message: "Collection deleted Successfully", collection: collectionExist});
}

const updateCollection = async(req, res) => {
    const {collectionId, name, category, userId} = req.body;
    if(!collectionId)
    {
        return res.status(400).json({message: "No collection id provided"});
    }

    if(!name && !category && !userId)
    {
        return res.status(400).json({message: "No new information provided"});
    }

    const collectionExist = await Collection.findOne({_id: collectionId});
    if(!collectionId)
    {
        return res.status(400).json({message: "No Collection found with this id"});
    }

    if(name)
    {
        collectionExist.name = name;
    }

    if(category)
    {
        collectionExist.category = category;
    }

    if(userId)
    {
        collectionExist.user = userId;
    }

    await collectionExist.save();
    res.status(200).json({message: "Collection Updated Successfully", collection: collectionExist});
}

const getUserCollections = async(req, res) => {
    const {userId} = req.body;
    if(!userId)
    {
        return res.status(400).json({message: "Please provide userId"});
    }
    const userCollections = await Collection.find({user: userId});
    if(!userCollections || userCollections.length < 1)
    {
        return res.status(400).json({message: "No collection of the given user found"});
    }
    return res.status(200).json({message: "Collection found", collections: userCollections, total: userCollections.length})
}

module.exports = {createCollection, deleteCollection, updateCollection, getAllCollections, getUserCollections};