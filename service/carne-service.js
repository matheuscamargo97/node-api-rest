const db = require("./db.js");
const helper = require("../helper");
const config = require("../db-config");

async function list(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, nome, valor, origem FROM Carne LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(carne) {
  if (!carne.nome) {
    return "Campo nome é OBRIGATÓRIO";
  }

  if (!carne.valor) {
    return "Campo valor é OBRIGATÓRIO";
  }

  if (!carne.origem) {
    return "Campo origem é OBRIGATÓRIO";
  }

  const result = await db.query(
    `INSERT INTO Carne 
      (nome, valor, origem) 
      VALUES 
      ("${carne.nome}", ${carne.valor}, "${carne.origem}")`
  );

  return result.affectedRows;
}

async function update(id, carne) {
  const result = await db.query(
    `UPDATE Carne
    SET nome = "${carne.nome}", valor = ${carne.valor}, origem = "${carne.origem}"
    WHERE id = ${id}`
  );

  return result.affectedRows;
}

async function remove(id){

  const result = await db.query(
    `DELETE FROM Carne WHERE id = ${id}`
  );

  return result.affectedRows;
}

module.exports = {
  list,
  create,
  update,
  remove
};
