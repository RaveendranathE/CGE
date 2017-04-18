//P4-12 Kenneth Mott and Wendy Eloe
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var MileageRateSchema = new Schema({
  _id: { type: Number, required: true },
  startDate: {type: Date, default: Date.now, required: true},
  dollarsPerMile: { type: Number, required: true }
})

var mileageRate = mongoose.model('MilegeRate', MileageRateSchema)
module.exports = mileageRate

//*** This code does not work at the moment but does not affect the project
// var request = require('request'),
//   cheerio = require('cheerio'),
//   mileRate = "";

// function getMileageRate(){
// request('https://www.irs.gov/tax-professionals/standard-mileage-rates', function(err, resp, body){
//   if(!err && resp.statusCode ==200){
//     var $ = cheerio.load(body);
//     $('first-child', '#content').each(function(){
//       var mileRate = this.attr('href');
//       mileRate.push(mileRate);

//     });
//   }
// });   
// return mileRate;
// }
