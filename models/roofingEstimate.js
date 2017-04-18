//P3-10
//Joel Beckley, Veera Kishon Kumar Mucherla
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
var IsDeleted;
const RoofingEstimateSchema = new Schema({
  _id: { type: Number, required: true },
  "client": { type: String, required: true },
  "address": { type: String, required: false },
  "city": { type: String, required: true },
  "state": { type: String, required: true },
  "zipcode": { type: String, required: false },
  "latitude": { type: Number, required: false },
  "longitude": { type: Number, required: false },
  "areas": [{
    "description": { type: String, required: true, default: "derp" },
    "widthFeet": { type: Number, required: true, default: 10 },
    "lengthFeet": { type: Number, required: true, default: 100 },
    "squarefootage": { $mult: ['$widthFeet', '$lengthFeet' ] }
  }],
  "roofing": {
    "roofType": { type: String, required: true, default: "Metal", enum: ["Metal", "Mod Bit", "Single Ply"] },
    "processType": { type: String, required: true, default: "Roof Coatings", enum: ["Roof Coatings", "Polyurethane Foam and Coatings"] },
    "coatingType": { type: String, required: true, default: "Urethane", enum: ["Urethane", "Silicone", "Acrylic"] },
    "coatingSelection": [{ type: Schema.Types.ObjectId, ref: RoofingCoating, required: false }],
    "coatingCoverageSqFt": { type: Number, required: false },
    "usesBasecoat": { type: Boolean, required: true, default: false },
    "basecoatSelection": [{ type: Schema.Types.ObjectId, ref: RoofingBasecoat, required: false }],
    "basecoatCoverageSqFt": { type: Number, required: false },
    "usesPrimer": { type: Boolean, required: true, default: false },
    "primerSelection": [{ type: Schema.Types.ObjectId, ref: RoofingPrimer, required: false }],
    "primerCoverageSqFt": { type: Number, required: false },
    "usesTopcoat": { type: Boolean, required: true, default: false },
    "topcoatSelection": [{ type: Schema.Types.ObjectId, ref: RoofingTopcoat, required: false }],
    "topcoatCoverageSqFt": { type: Number, required: false }
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

RoofingEstimateSchema.virtual("created").get(function () {
  return this._id.getTimestamp();
})

RoofingEstimateSchema.virtual("totalCost").get(function () {
  return 2000;
})

RoofingEstimateSchema.virtual("costPerSquareFoot").get(function () {
  return totalCost/sqft;
})

RoofingEstimateSchema.virtual("bidPerSquareFoot").get(function () {
  return costPerSquareFoot*(1.0+margin);
})

var roofingEstimate = mongoose.model("RoofingEstimate", RoofingEstimateSchema)
module.exports = roofingEstimate
