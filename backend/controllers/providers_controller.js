const Provider = require("../models/providers");

exports.get = async (req, res)=>{
    try{
    
        const providers = await Provider.find();
        return res.status(200).json(providers);            

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error"});
    }
};

exports.get_by_id = async (req, res)=>{
    try{
        const id = req.params.id;
        const provider = await Provider.findOne({ _id: id});
        if(!provider) return res.status(404).json({details: "Resource does not exist or is not available", status: 404});        
        return res.status(200).json(provider);

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error"});
    }
};

exports.post = async (req, res)=>{
    try{

        const params = req.body;
        const newProvider = new Provider(params);
        const save = await newProvider.save();
        return res.status(200).json({details: "Provider was saved correctly!", insertId: save._id , status: 201 });

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error"});
    }
};

exports.put = async (req, res)=>{
    try{

        const id = req.params.id;
        const params = req.body;
        const exist = await Provider.findOne({ _id: id});
        if(!exist) return res.status(404).json({details: "Resource does not exist or is not available", status: 404}); 
        const provider = await Provider.findByIdAndUpdate(exist._id, params);
        return res.status(200).json({details: "Resource was updated correctly", status: 200});

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error"});
    }
};

exports.delete = async (req, res)=>{
    try{

        const id = req.params.id;
        const exist = await Provider.findOne({ _id: id});
        if(!exist) return res.status(404).json({details: "Resource does not exist or is not available", status: 404});   
        const provider = await Provider.deleteOne({_id: exist._id});
        return res.status(200).json({details: "Resource was deleted correctly", status: 200 });

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error"});
    }
};