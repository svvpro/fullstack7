const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('cars', carSchema);