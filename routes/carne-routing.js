const express = require("express");
const router = express.Router();
const carnes = require("../service/carne-service");

//GET Carnes
router.get("/", async function (req, res, next) {
  try {
    res.json(await carnes.list(req.query.page));
  } catch (err) {
    console.error(`Error while getting Carnes`, err.message);
    next(err);
  }
});

router.post("/create", async function (req, res, next) {

  try {
    const result = await carnes.create(req.body);

    if (result == 1) {
      res.status(201).send({ message: "Carne criada com sucesso!" });
    } else if (typeof result == "string") {
      res.status(400).send({ message: result });
    } else {
      res.status(400).send({ message: "Erro ao criar oferta de carne" });
    }
  } catch (err) {
    console.error("Error while insert Carne offert", err.message);
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const result = await carnes.update(req.params.id, req.body);
    if (result) {
      res.status(201).send({ message: "Carne atualizada com sucesso!" });
    } else {
      res.status(404).send({ message: "Carne não encontrada" });
    }
  } catch (err) {
    console.error("Error while updating Carne offert", err.message);
    next(err);
  }
});

router.delete("/:id", async function (req, res, next){
  try{
    const result = await carnes.remove(req.params.id);
    
    if(result == 1){
      res.status(200).send({message: "Carne deletada com sucesso!"});
    } else{
      res.status(404).send({message: "Carne inválida"});
    }
  }catch(err){
    console.error("Error while deleting Carne offert", err.message);
    next(err);
  }


});

module.exports = router;
