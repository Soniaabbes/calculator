const express= require('express');
const isAuth = require("../midelwares/isAuth");

const { createChaine, updateChaine, deleteChaine, getuserChaine, getAllChaines, getOneChaine, deleteChaineByChaineId } = require('../Controllers/ChaineController');
const router= express.Router();
//get all sequences
router.get ("/getAllSequences",getAllChaines)
//get one sequence by id
router.get ("/getOneSeq/:id",getOneChaine)
// get seq by user id
router.get ("/getSeqUser/:id", getuserChaine)
// create new sequence 
router.post ("/createSeq",isAuth ,createChaine)
//update sequence
router.put ("/updateSeq/:id" ,updateChaine)



// delete sequence
router.delete('/deleteSeq/:id',deleteChaine )
router.delete('/byChaineId/:chaineId', deleteChaineByChaineId)
module.exports = router;