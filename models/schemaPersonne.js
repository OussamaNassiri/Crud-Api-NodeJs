const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personneSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, "Please enter your username!!"]
        },
        password: {
            type: String,
            required: [true, "Please enter your password!!"]
        }, 
        age: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Personne = mongoose.model("Personne", personneSchema);

module.exports = Personne;