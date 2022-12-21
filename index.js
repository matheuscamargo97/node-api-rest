const express = require("express");
const app = express();
const port = 3000;
const carnesRouter = require("./routes/carne-routing");


app.use(express.json()); //define formato da requisição (JSON nesse caso)

app.use(
    express.urlencoded({
        extended:true
    })
);

app.get("/", (req, res) => {
    res.json({message: `SERVER RUNNING ON PORT ${port}...`});
}) //passa os parametros pela url

app.use("/carnes", carnesRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({message: err.message});
    return;
});


app.listen(port,() => {
    console.log (`App listening at http://localhost:${port}`);
});