const db = require("./db.js");
const helper = require("../helper");
const config = require("../db-config");

async function list(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, nome, valor, origem FROM Carne LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

module.exports = {
    list
}