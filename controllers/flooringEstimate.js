//P2-3
//Challa Sreeja Reddy,Koushik Lakkaraju
var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var express = require('express');
var api = express.Router();
var Model = require('../models/flooringEstimate.js');
const notfoundstring = 'estimates';

// see app.js for the root request this controller handles

// GET to this controller root URI
api.get("/", function (request, response) {
    response.render("flooringEstimate/index.ejs");
});

api.get('/findall', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.flooringEstimates.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.flooringEstimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});

// GET create
api.get("/create", ensureAuthenticated.ensureLoggedIn, function (req, res) {
    console.log('Handling GET /create' + req);
    res.render("flooringEstimate/create",
        { title: "WP Primers", layout: "layout.ejs" });
});

// GET /delete/:id
api.get('/delete/:id', function (req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.flooringEstimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('flooringEstimate/delete.ejs',
        {
            title: "Estimates",
            layout: "layout.ejs",
            estimate: item
        });
});

// GET /details/:id
api.get('/details/:id', function (req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.flooringEstimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('flooringEstimate/details.ejs',
        {
            title: "Estimates",
            layout: "layout.ejs",
            estimate: item
        });
});


// GET one
api.get('/edit/:id', function (req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.flooringEstimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('flooringEstimate/edit.ejs',
        {
            title: "Estimates",
            layout: "layout.ejs",
            estimate: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function (req, res) {
    console.log("Handling POST " + req);
    console.log("SAVING REQUEST BODY " + JSON.stringify(req.body)) // addl debugging info
    var data = req.app.locals.flooringEstimates.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.client = req.body.client;
    item.address = req.body.address;
    item.city = req.body.city;
    item.state = req.body.state;
    item.zipcode = req.body.zipcode;
    item.latitude = req.body.latitude;
    item.longitude = req.body.longitude;
    item.areas = [];
    if (req.body.description.length > 1) {
        for (count = 0; count < req.body.description.length - 1; count++) {
            item.areas.push({
                    "description": req.body.description[count],
                    "lengthFeet": parseInt(req.body.lengthFeet[count]),
                    "widthFeet": parseInt(req.body.widthFeet[count]),
                    "squarefootage": req.body.widthFeet*req.body.lengthFeet 
                }
            )
        }
    };
    item.isDeleted = false;
    item.flooring = {
        "floorSystemType": req.body.floorSystemType == 'on' ? true : false,
        "usesUrethane": req.body.usesUrethane == 'on' ? true : false,
        "urethaneProductSelection": req.body.urethaneProductSelection,
        "urethaneCoverageSqFt": req.body.urethaneCoverageSqFt,
        "usesEpoxy": req.body.usesEpoxy == 'on' ? true : false,
        "epoxyProductSelection": req.body.epoxyProductSelection,
        "epoxyCoverageSqFt": req.body.epoxyCoverageSqFt
    };
    item.aggregate = {
        "isUsed": req.body.usesAggregate == 'on' ? true : false,
        "aggregateTypeSelection": req.body.aggregateTypeSelection,
        "aggregateMaterialSelection": req.body.aggregateMaterialSelection,
        "coverageSqFt": req.body.coverageSqFt
    };
    item.laborEntries = [];
    if (req.body.hoursPerPerson && req.body.hoursPerPerson.length > 1) {
        for (i = 0; i < req.body.hoursPerPerson.length - 1; i++) {
            item.laborEntries.push(
                {
                    "description": req.body.labourdescription,
                    "count": parseInt(req.body.count[i]),
                    "hoursPerPerson": parseFloat(req.body.hoursPerPerson[i]),
                    "dollarsPerHour": parseFloat(req.body.dollarsPerHour[i]),
                    "nightsPerPerson": parseInt(req.body.nightsPerPerson[i]),
                    "roomCost": parseFloat(req.body.roomCost[i])
                }
            )
        }
    };
    item.mileageEntries = [];
    if (req.body.milesPerDrive.length > 1) {
        for (i = 0; i < req.body.milesPerDrive.length - 1; i++) {
            item.mileageEntries.push(
                {
                    "description": req.body.mileagedescription,
                    "numberOfVehicles": parseInt(req.body.numberOfVehicles[i]),
                    "milesPerDrive": parseInt(req.body.milesPerDrive[i]),
                    "dollarsPerMile": parseFloat(req.body.dollarsPerMile[i]),
                    "Total":req.body.numberOfVehicles*req.body.milesPerDrive*req.body.dollarsPerMile
                }
            )
        }
    };
  item.miscellaneousEntries = [
        {
            "miscdescription": req.body.miscdescription1,
            "cost": parseFloat(req.body.cost[0])
        },
        {
            "miscdescription": req.body.miscdescription2,
            "cost": parseFloat(req.body.cost[1])
        },
        {
            "miscdescription": req.body.miscdescription3,
            "cost": parseFloat(req.body.cost[2])
        },
        {
            "miscdescription": req.body.miscdescription4,
            "cost": parseFloat(req.body.cost[3])
        }
    ],
    item.comment = req.body.comment;
    item.margin = 0.75 // req.body.margin;
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/flooringEstimate');
});

// POST update
api.post('/save/:id', function (req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.flooringEstimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.client = req.body.client;
    item.address = req.body.address;
    item.city = req.body.city;
    item.state = req.body.state;
    item.zipcode = req.body.zipcode;
    item.latitude = req.body.latitude;
    item.longitude = req.body.longitude;
    item.areas = [];
    if (req.body.description.length > 1) {
        for (count = 0; count < req.body.description.length - 1; count++) {
            item.areas.push({
                    "description": req.body.description[count],
                    "lengthFeet": parseInt(req.body.lengthFeet[count]),
                    "widthFeet": parseInt(req.body.widthFeet[count]),
                    "squarefootage": req.body.widthFeet*req.body.lengthFeet 
                }
            )
        }
    };
    item.isDeleted = false;
    item.flooring = {
        "floorSystemType": req.body.floorSystemType == 'on' ? true : false,
        "usesUrethane": req.body.usesUrethane == 'on' ? true : false,
        "urethaneProductSelection": req.body.urethaneProductSelection,
        "urethaneCoverageSqFt": req.body.urethaneCoverageSqFt,
        "usesEpoxy": req.body.usesEpoxy == 'on' ? true : false,
        "epoxyProductSelection": req.body.epoxyProductSelection,
        "epoxyCoverageSqFt": req.body.epoxyCoverageSqFt
    };
    item.aggregate = {
        "isUsed": req.body.usesAggregate == 'on' ? true : false,
        "aggregateTypeSelection": req.body.aggregateTypeSelection,
        "aggregateMaterialSelection": req.body.aggregateMaterialSelection,
        "coverageSqFt": req.body.coverageSqFt
    };
    item.laborEntries = [];
    if (req.body.hoursPerPerson && req.body.hoursPerPerson.length > 1) {
        for (i = 0; i < req.body.hoursPerPerson.length - 1; i++) {
            item.laborEntries.push(
                {
                    "description": req.body.labourdescription,
                    "count": parseInt(req.body.count[i]),
                    "hoursPerPerson": parseFloat(req.body.hoursPerPerson[i]),
                    "dollarsPerHour": parseFloat(req.body.dollarsPerHour[i]),
                    "nightsPerPerson": parseInt(req.body.nightsPerPerson[i]),
                    "roomCost": parseFloat(req.body.roomCost[i])
                }
            )
        }
    };
    item.mileageEntries = [];
    if (req.body.milesPerDrive && req.body.milesPerDrive.length > 1) {
        for (i = 0; i < req.body.milesPerDrive.length - 1; i++) {
            item.mileageEntries.push(
                {
                    "description": req.body.mileagedescription,
                    "numberOfVehicles": parseInt(req.body.numberOfVehicles[i]),
                    "milesPerDrive": parseInt(req.body.milesPerDrive[i]),
                    "dollarsPerMile": parseFloat(req.body.dollarsPerMile[i]),
                    "Total":req.body.numberOfVehicles*req.body.milesPerDrive*req.body.dollarsPerMile
                }
            )
        }
    };
    item.miscellaneousEntries = [
        {
            "miscdescription": req.body.miscdescription1,
            "cost": parseFloat(req.body.cost[0])
        },
        {
            "miscdescription": req.body.miscdescription2,
            "cost": parseFloat(req.body.cost[1])
        },
        {
            "miscdescription": req.body.miscdescription3,
            "cost": parseFloat(req.body.cost[2])
        },
        {
            "miscdescription": req.body.miscdescription4,
            "cost": parseFloat(req.body.cost[3])
        }
    ],
    item.comment = req.body.comment;
    item.margin = 0.75 // req.body.margin;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/flooringEstimate');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function (req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.flooringEstimates.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/flooringEstimate');
});

module.exports = api;
/* 10 controller methods handled by controller:

controllers/flooringEstimate.js

2 Respond with JSON:

http://localhost:8082/flooringEstimate/findall [WORKING]
http://localhost:8082/flooringEstimate/findone/1 [WORKING]

5 Respond with CRUD Views:

http://localhost:8082/flooringEstimate [WORKING]
http://localhost:8082/flooringEstimate/create [WORKING]
http://localhost:8082/flooringEstimate/delete/1 [WORKING]
http://localhost:8082/flooringEstimate/details/1 [WORKING]
http://localhost:8082/flooringEstimate/edit/1[WORKING]

3 Respond by executing CRUD actions:

http://localhost:8082/flooringEstimate/save [NOT-WORKING]
http://localhost:8082/flooringEstimate/save/1 [NOT-WORKING]
http://localhost:8082/flooringEstimate/delete/1
*/