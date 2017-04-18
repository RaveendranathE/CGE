// set up a temporary (in memory) database
const Datastore = require('nedb');
//var dbtoexpress = require("db-to-express-rest");

module.exports = {
    load: function(){

        var db = new Datastore();
        db.loadDatabase();

        // Read in the sample data files
        // has to be global to make sure we can access from verify.js
        global.aggregateMaterials = require('../data/aggregateMaterials.yml');
        global.flooringCoatings = require('../data/flooringCoatings.yml');
        global.flooringEstimates = require('../data/flooringEstimates.json');
        global.mileageRates = require('../data/mileageRates.json');
        global.prospects = require('../data/prospects.json');
        global.roofingBasecoats = require('../data/roofingBasecoats.yml');
        global.roofingCoatings = require('../data/roofingCoatings.yml');
        global.roofingEstimates = require('../data/roofingEstimates.json');
        global.roofingPrimers = require('../data/roofingPrimers.json');
        global.roofingTopcoats = require('../data/roofingTopcoats.yml');
        global.waterproofingBasecoats = require('../data/waterproofingBasecoats.yml');
        global.waterproofingEstimates = require('../data/waterproofingEstimates.json');
        global.waterproofingPrimers = require('../data/waterproofingPrimers.json');
        global.waterproofingTopcoats = require('../data/waterproofingTopcoats.yml');

        // insert the sample data into our data store
        db.insert(aggregateMaterials);
        db.insert(flooringCoatings);
        db.insert(flooringEstimates);
        db.insert(mileageRates);
        db.insert(prospects);
        db.insert(roofingBasecoats);
        db.insert(roofingCoatings);
        db.insert(roofingEstimates);
        db.insert(roofingPrimers);
        db.insert(roofingTopcoats);
        db.insert(waterproofingBasecoats);
        db.insert(waterproofingEstimates);
        db.insert(waterproofingPrimers);
        db.insert(waterproofingTopcoats);

        // intialize app.locals (these objects will be available to our controllers)
        app.locals.aggregateMaterials = db.find(aggregateMaterials);
        app.locals.flooringCoatings = db.find(flooringCoatings);
        app.locals.flooringEstimates = db.find(flooringEstimates);
        app.locals.mileageRates = db.find(mileageRates);
        app.locals.prospects = db.find(prospects);
        app.locals.roofingBasecoats = db.find(roofingBasecoats);
        app.locals.roofingCoatings = db.find(roofingCoatings);
        app.locals.roofingEstimates = db.find(roofingEstimates);
        app.locals.roofingPrimers = db.find(roofingPrimers);
        app.locals.roofingTopcoats = db.find(roofingTopcoats);
        app.locals.waterproofingBasecoats = db.find(waterproofingBasecoats);
        app.locals.waterproofingEstimates = db.find(waterproofingEstimates);
        app.locals.waterproofingPrimers = db.find(waterproofingPrimers);
        app.locals.waterproofingTopcoats = db.find(waterproofingTopcoats);

        //users
        const userController = require('../controllers/user');
        var users = require('../data/users.json');
        users.data.forEach(function(user){
            userController.newUser(user)    
        });
    }
}

