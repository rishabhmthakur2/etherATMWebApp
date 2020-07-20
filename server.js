const express = require("express");
const path = require("path");
const hbs = require("hbs");
const BN = require('bn.js');
const referrers = require('./.transactions/.referrers.js');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json())

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index");
});

app.get("/isReferrer/:id", async (req, res) => {
    const referrerAddress = req.params.id;
    const isReferrer = await referrers.includes(referrerAddress);
    return res.send({
        isReferrer
    });
});

app.post("/addInvester/:id", async (req, res) => {
    const investerAddress = req.params.id;
    const isReferrer = await referrers.includes(investerAddress);
    if (isReferrer) {
        res.send();
    }
    else {
        referrers.push(investerAddress);
        res.send();
    }
});

app.listen(port, () => {
    console.log("Server is listening for calls.");
});