// Dev Team P3-6
// Neeraja Garigipati s528801
// Vaishnavi Kalvakota s528803
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var RoofingCoatingSchema = new Schema({
    name:  { type: String, required: true },
    unit:  { type: String, required: true },
    displayorder:  { type: String, required: true },
    price:  { type: Number, required: true },
    isActive:{type: Boolean, required: true, default:true }
})

var roofingCoating = mongoose.model('RoofingCoating', RoofingCoatingSchema)
module.exports = roofingCoating