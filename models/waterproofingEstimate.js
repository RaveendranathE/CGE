

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

const WaterproofingEstimateSchema = new Schema({
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
    "squarefootage": { $mult: ['$widthFeet', '$lengthFeet' ] }
  }],
  "IsDeleted": { type: Boolean, required: true, default: false },
  "waterproofing": {
     "productType": { type: String, required: true, default: "Urethane", enum: ["Urethane", "Cementicious Overlay"] },
     "usesUrethane": { type: Boolean, required: true, default: false },
     "urethaneSelection": [{ type: Schema.Types.ObjectId, ref: FlooringCoating, required: false }],
     "urethaneCoverageSqFt": { type: Number, required: true },
     "usesExpoxy": { type: Boolean, required: true, default: false },
     "epoxySelection": [{ type: Schema.Types.ObjectId, ref: FlooringCoating, required: false }],
     "epoxyCoverageSqFt": { type: Number, required: true },
     "usesUrethanePrimer": { type: Boolean, required: true, default: false },
     "urethanePrimerSelection": [{ type: Schema.Types.ObjectId, ref: FlooringCoating, required: false }],
     "urethanePrimerCoverageSqFt": { type: Number, required: true },
     "usesBasecoat": { type: Boolean, required: true, default: false },
     "basecoatSelection": [{ type: Schema.Types.ObjectId, ref: WaterproofingBasecoat, required: false }],
     "basecoatCoverageSqFt": { type: Number, required: true },
     "usesPrimer": { type: Boolean, required: true, default: false },
     "primerSelection": [{ type: Schema.Types.ObjectId, ref: WaterproofingPrimer, required: false }],
     "primerCoverageSqFt": { type: Number, required: true },
     "usesTopcoat": { type: Boolean, required: true, default: false },
     "topcoatSelection": [{ type: Schema.Types.ObjectId, ref: WaterproofingTopcoat, required: false }],
     "topcoatCoverageSqFt": { type: Number, required: true },
     "IsDeleted": { type: Boolean, required: true, default:false},
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
  "sqft": {$sum: ['areas.squarefootage']}
})

WaterproofingEstimateSchema.virtual("created").get(function () {
  return this._id.getTimestamp();
})

WaterproofingEstimateSchema.virtual("totalCost").get(function () {
  return 2000;
})

WaterproofingEstimateSchema.virtual("costPerSquareFoot").get(function () {
  return totalCost/sqft;
})

WaterproofingEstimateSchema.virtual("bidPerSquareFoot").get(function () {
  return costPerSquareFoot*(1.0+margin);
})

var waterproofingEstimate = mongoose.model("WaterproofingEstimate", WaterproofingEstimateSchema)
module.exports = waterproofingEstimate
