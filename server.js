const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Personne = require("./models/schemaPersonne")
const bcrypt = require("bcrypt")
const port = 3000;
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Hello World")
})

app.get("/personnes", async (req, res) => {
    try {
        const personnes = await Personne.find({});
        res.status(200).json(personnes);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post("/create", async (req, res) => {
    try {
        const persoUserName = await Personne.findOne({userName: req.body.userName});
        if (persoUserName) {
            res.status(404).json({message: `Wrong userName or Password`})
        } else {
            const newPassword = await bcrypt.hash(req.body.password, 10);
            const objetPersonne = {
                userName: req.body.userName,
                password: newPassword,
                age: req.body.age
            }
            const newPersonne = await Personne.create(objetPersonne)
            res.status(200).json(newPersonne);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put("/update/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const personne = await Personne.findByIdAndUpdate(id, req.body);
        if(!personne) {
            res.status(404).json({message: `cannt find this ID ${id}`})
        }
        const newPersonne = await Personne.findById(id);
        res.status(200).json(newPersonne);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete("/delete/:id", async (req, res)=> {
    try {
        const {id} = req.params;
        const personne = await Personne.findByIdAndDelete(id);
        if(!personne) {
            res.status(404).json({message: `cannt find this ID ${id}`})
        }
        res.status(200).json(personne);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
,
app.get("/show/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const personne = await Personne.findById(id);
        if(!personne) {
            res.status(404).json({message: `cannt find this ID ${id}`})
        }
        res.status(200).json(personne)
    } catch (error) {
        
    }
})



mongoose.connect("mongodb://localhost:27017/Personnes")
    .then(() => {
        app.listen(port, ()=> {
            console.log(`Server is run in port ${port}`)
        })
    })
    .catch((error) => {
        console.log({message: error.message})
    })