const ResearchPaper = require("../models/ResearchPaper");
const Collection = require("../models/Collection");
const fs = require("fs");
const getResearchPapers = async(req, res) => {
    const papers = await ResearchPaper.find({});
    if(!papers || papers.length < 1)
    {
        return res.status(400).json({message: "No research papers found"});
    }
    return res.status(200).json({message: "Research papers found", researchPapers: papers, total: papers.length});
}
const createResearchPaper = async(req,  res) => {
    const {name, physicalLocation, collectionId} = req.body;
    if(!req.file)
    {
        return res.status(400).json({message: "Please send data in form-data form"});
    }
    const {filename} = req.file;
    console.log(req.file);
    if(!filename)
    {
        return res.status(400).json({message: "No file name detected"});
    }
    if(!name || !collectionId)
    {
        return res.status(400).json({message: "Please provide with all the necessary information."});
    }
    const collectionExist = await Collection.findOne({_id: collectionId});
    if(!collectionExist)
    {
        return res.status(400).json({message: "No collection with given id found"});
    }
    const newPaper = await ResearchPaper.create({
        name,
        fileName: filename,
        physicalLocation,
        filePath: process.cwd() + "\\files",
        collectionId
    });
    if(!newPaper)
    {
        return res.status(500).json({message: "Error creating new research paper"});
    }
    return res.status(200).json({message: "Research paper successfully created", researchPaper: newPaper});
}

const deleteResearchPaper = async(req, res)=>{
    const {researchPaperId} = req.body;
    if(!researchPaperId)
    {
        return res.status(400).json({message: "No research Paper Id found"});
    }
    const paper = await ResearchPaper.findOneAndDelete({_id: researchPaperId});
    if(!paper)
    {
        return res.status(500).json({message: "Error while deleting research paper"});
    }
    const filePath = paper.filePath + "\\" + paper.fileName;
    try {await fs.unlink(filePath, err=>
    {
        if(err)
        {
            console.log(err);
        }else
        {
            console.log("PDF File deleted from the folder successfully.");
        }
    });}
    catch(err){console.log("Error while deleting the pdf file" + err);}
    return res.status(200).json({message: "Research paper deleted successfully", researchPaper: paper});
}

const updateResearchPaper = async(req, res) => {
    const {name, physicalLocation, researchPaperId} = req.body;
    if(!researchPaperId)
    {
        return res.status(400).json({message: "Please provide research paper id"});
    }
    const paper = await ResearchPaper.findOne({_id: researchPaperId});
    if(!paper)
    {
        return res.status(400).json({message: "No paper with given id found"});
    }
    if(name)
    {
        paper.name = name;
    }

    if(physicalLocation)
    {
        paper.physicalLocation = physicalLocation;
    }
    await paper.save();
    return res.status(200).json({message: "Research Paper updated Successfully.", researchPaper: paper});
}

const getCollectionResearchPaper = async(req, res) => {
    const {collectionId} = req.body;
    if(!collectionId)
    {
        return res.status(400).json({message: "Please provide collection id found"});
    }
    const collection = await Collection.findOne({_id: collectionId});
    if(!collection)
    {
        return res.status(400).json({message: "No collection with given id found"});
    }
    const papers = await ResearchPaper.find({collectionId});
    if(!papers || papers.length < 1)
    {
        return res.status(400).json({message: "No papers for the given collection found"});
    }
    return res.status(200).json({researchPapers: papers, total: papers.length});
}

module.exports = {getResearchPapers, createResearchPaper, deleteResearchPaper, updateResearchPaper, getCollectionResearchPaper};