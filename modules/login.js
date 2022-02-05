const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;