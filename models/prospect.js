//P2-10 Jordan Nazario

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var ProspectSchema = new Schema({
  _id: { type: Number, required: true },
  customerName: {type: String, default: "", required: true},
  address: {type: String, default: "", required: true},
  city: { type: String, default: "", required: true },
  state: {type: String, default:"",required: true},
  zip: {type: String, default: "", required: true},
  sqft: {type: Number,required: true},
  customerType: {type: String, default: "", required:true},
  contact: {type: String, default: "", required:false}

})

var prospect = mongoose.model('Prospect', ProspectSchema)
module.exports = prospect
