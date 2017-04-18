//P3-8
//#Swaroop gembali, #Tarunkumar Potlapalli
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var RoofingTopcoatSchema = new Schema({
   _id: { type: Number, required: true },
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    status:{type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true },
    isActive:{type: Boolean, required: true , default:true}

})

var roofingTopcoat = mongoose.model('RoofingTopcoat', RoofingTopcoatSchema)
module.exports = roofingTopcoat

