// P2-8
// ShivaTeja Miyapuram, Manohar Sriram
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var FlooringCoatingSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    unit: { type: String, required: true },
    displayorder: { type: String, required: true },
    price: { type: Number, required: true }
})

var flooringCoating = mongoose.model('FlooringCoating', FlooringCoatingSchema)
module.exports = flooringCoating
