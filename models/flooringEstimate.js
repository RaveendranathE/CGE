//P2-3
//Challa Sreeja Reddy,Koushik Lakkaraju
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AggregateMaterial = require("./aggregateMaterial.js");
const FlooringCoating = require("./flooringCoating.js");
const RoofingCoating = require("./roofingCoating.js");
const RoofingBasecoat = require("./roofingBasecoat.js");
const RoofingPrimer = require("./roofingPrimer.js");
const RoofingTopcoat = require("./roofingTopcoat.js");
const WaterproofingBasecoat = require("./waterproofingBasecoat.js");
const WaterproofingPrimer = require("./waterproofingPrimer.js");
const WaterproofingTopcoat = require("./waterproofingTopcoat.js");

const FlooringEstimateSchema = new Schema({
  _id: { type: Number, required: true },
  "client": { type: String, required: true },
  "address": { type: String, required: false },
  "city": { type: String, required: true },
  "state": { type: String, required: true },
  "zipcode": { type: String, required: false },
  "latitude": { type: Number, required: false },
  "longitude": { type: Number, required: false },
  "areas": [{
    "_id": { type: Number, required: true },
    "description": { type: String, required: true },
    "widthFeet": { type: Number, required: true, default: 10 },
    "lengthFeet": { type: Number, required: true, default: 100 },
    "squarefootage": { $mult: ['$widthFeet', '$lengthFeet'] }
  }],
  "IsDeleted": { type: Boolean, required: true, default: false },
  "flooring": {
    "floorSystemType": { type: String, required: true, default: "Epoxy", enum: ["Epoxy", "Decorative Epoxy", "Urethane"] },
    "usesUrethane": { type: Boolean, required: true, default: true },
    "urethaneProductSelection": { type: Schema.Types.ObjectId, ref: FlooringCoating, required: false },
    "urethaneCoverageSqFt": { type: Number, required: true },
    "usesEpoxy": { type: Boolean, required: true, default: true },
    "epoxyProductSelection": { type: Schema.Types.ObjectId, ref: FlooringCoating, required: false },
    "epoxyCoverageSqFt": { type: Number, required: false }
  },
  "aggregate": {
    "isUsed": { type: Boolean, required: true, default: false },
    "aggregateTypeSelection": { type: String, required: false, default: "Sand", enum: ["Sand", "Quartz", "Flake", "Glass Beads"] },
    "aggregateMaterialSelection": { type: Number, ref: AggregateMaterial, required: false },
    "coverageSqFt": { type: Number, required: false }
  },
  "laborEntries": [{
    "description": { type: String, required: true },
    "count": { type: Number, required: true, default: 1 },
    "hoursPerPerson": { type: Number, required: true, default: 8 },
    "dollarsPerHour": { type: Number, required: true, default: 15 },
    "nightsPerPerson": { type: Number, required: true, default: 1 },
    "roomCost": { type: Number, required: true, default: 80 }
  }],
  "mileageEntries": [{
    "description": { type: String, required: true },
    "numberOfVehicles": { type: Number, required: true, default: 1 },
    "milesPerDrive": { type: Number, required: true, default: 100 },
    "dollarsPerMile": { type: Number, required: true, default: 0.50 }
  }],
  "miscellaneousEntries": [{
    "_id": {type: Number},
    "miscdescription": { type: String, required: false },
    "cost": { type: Number, required: false, default: 0 }
  }],
  "comment": { type: String },
  "margin": { type: Number, default: 0.50 },
  "lastUpdated": { type: Date, default: Date.now },
  "sqft": { $sum: ['areas.squarefootage'] }
})

FlooringEstimateSchema.virtual("created").get(function () {
  return this._id.getTimestamp();
})

FlooringEstimateSchema.virtual("totalCost").get(function () {
  return 2000;
})

FlooringEstimateSchema.virtual("costPerSquareFoot").get(function () {
  return totalCost / sqft;
})

FlooringEstimateSchema.virtual("bidPerSquareFoot").get(function () {
  return costPerSquareFoot * (1.0 + margin);
})

var flooringEstimate = mongoose.model("FlooringEstimate", FlooringEstimateSchema)
module.exports = flooringEstimate
