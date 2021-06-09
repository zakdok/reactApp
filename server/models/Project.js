const mongoose = require("mongoose");
const Schema = mongoose.Schema

const projectSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    }, 
    pages: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };
