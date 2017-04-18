//P4-12 Kenneth Mott and Wendy Eloe
var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/mileageRate.js');
const notfoundstring = 'No such mileage rate';

// see app.js for the root request this controller handles
// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "mileageRate")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DELETE)

// HANDLE JSON REQUESTS --------------------------------------------

api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.mileageRates.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.mileageRates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});

// HANDLE VIEW DISPLAY REQUESTS --------------------------------------------

// GET all
api.get('/', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('mileage_rate/index.ejs',
        { title: "Mileage Rates", layout: "layout.ejs" });
});

// GET create
api.get("/create", function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("mileage_rate/create.ejs",
        { title: "Mileage Rates", layout: "layout.ejs" });
});

// GET /delete/:id
api.get('/delete/:id', function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.mileageRates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('mileage_rate/delete.ejs',
        {
            title: "Mileage Rates",
            layout: "layout.ejs",
            mileageRate: item
        });
});

// GET /details/:id
api.get('/details/:id', function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.mileageRates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('mileage_rate/details.ejs',
        {
            title: "Mileage Rates",
            layout: "layout.ejs",
            mileageRate: item
        });
});

// GET one
api.get('/edit/:id', function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.mileageRates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('mileage_rate/edit.ejs',
        {
            title: "Mileage Rates",
            layout: "layout.ejs",
            mileageRate: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.mileageRates.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.startDate = req.body.startDate;
    item.dollarsPerMile = req.body.dollarsPerMile;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/mileageRate');
});

// POST update
api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.mileageRates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.startDate = req.body.startDate;
    item.dollarsPerMile = req.body.dollarsPerMile;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/mileageRate');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.mileageRates.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/mileageRate');
});


module.exports = api;

/* 10 controller methods handled by controller:

controllers/milageRate.js

2 Respond with JSON:

http://127.0.0.1:8082/milageRate/findall [WORKING]
http://127.0.0.1:8082/milageRate/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8082/milageRate [WORKING]
http://127.0.0.1:8082/milageRate/create [WORKING]
http://127.0.0.1:8082/milageRate/delete/1 [WORKING]
http://127.0.0.1:8082/milageRate/details/1 [WORKING]
http://127.0.0.1:8082/milageRate/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8082/milageRate/save [WORKING]
http://127.0.0.1:8082/milageRate/save/1 [WORKING]
http://127.0.0.1:8082/milageRate/1 [WORKING]
*/