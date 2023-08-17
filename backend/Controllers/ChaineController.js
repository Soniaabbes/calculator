const Chaine = require("../Model/chaine")
// get all chaine
exports.getAllChaines = async (req, res) => {
    try {
        const chaine = await Chaine.find()
        res.status(201).send({msg: "all ", chaine})

    } catch (error) {
        res.status(500).send({msg: 'there is an error'})
    }
}
// get one chaine
exports.getOneChaine= async(req,res)=>{
    const {id}= req.params
    try {
        const chaine= await  Chaine.findById(id)
        res.status(201).send({msg:'these is ', chaine})
    } catch (error) {
        res.status(500).send({msg:'there is an error'})
        
    }
}
// create new chaine
exports.createChaine= async (req, res) => {

 
    try {
      
        const chaine = {
            baseNucleo: req.body.baseNucleo,
            pourcentageGc: req.body.pourcentageGc,
            chaineId:req.user.id
            
        };
        
        await Chaine.create(chaine)
        console.log( chaine)
        res.status(201).send({msg: ' chaine is created',chaine})
    } catch (error) {
       
        res.status(500).send({msg: "their is an error"})


    }
}
// update chaine
exports.updateChaine = async (req, res) => {
    const {id} = req.params;
    try {
        const productChaine = await Chaine.findByIdAndUpdate(id, {
            $set: {
                ...req.body
            }
        }, {new: true})
        res.status(201).send({msg: 'chaine is updated', productChaine})
    } catch (error) {
        res.status(500).send({msg: "there is an error"})

    }
}
// delete chaine
exports.deleteChaine = async (req, res) => {
    const {id} = req.params
    try {
        const deleteChaine = await Chaine.findByIdAndDelete(id);
        res.status(201).send({msg: 'chaine is deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: 'there is an error'})

    }
}

// get user chaine
exports.getuserChaine = async (req, res) => {
    const {id}= req.params
    try {
        const chaine= await Chaine.find({ chaineId:id})
        res.status(200).send({msg: "All chaine", chaine});
    } catch (error) {
        res.status(500).send("server error");
    }
};
// delete chaine userId
exports.deleteChaineByChaineId = async (req, res) => {
    const { chaineId } = req.params; // Grab the chaineId from params

    try {
        await Chaine.deleteMany({ chaineId: chaineId });
        res.status(200).send({ msg: `All chaines with chaineId ${chaineId} have been deleted` });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'There is an error' });
    }
}
