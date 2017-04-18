// Dev Team P3-6
// Neeraja Garigipati s528801
// Vaishnavi Kalvakota s528803
var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/roofingPrimer.js');
const notfoundstring = 'No such roofing Primers';

// GET to this controller root URI
api.get("/", function (req, res) {
    return res.render('roofing_primers/index.ejs');
});

api.get('/findall', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.roofingPrimers.query;
    res.send(JSON.stringify(data));
});
api.get('/findone/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingPrimers.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});



// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "waterproofingPrimer")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DELETE)

// HANDLE JSON REQUESTS --------------------------------------------


//GET create 
api.get('/create', function (request, response) {
    response.render("roofing_primers/create.ejs");
});

//GET /delete/:id 

api.get('/delete/:id', function (req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingPrimers.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofing_primers/delete.ejs',
        {
            title: "RP",
            layout: "layout.ejs",
            roofingPrimer: item
        });
});

// GET /details/:id
api.get('/details/:id', function (req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingPrimers.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofing_primers/details.ejs',
        {
            title: "RP",
            layout: "layout.ejs",
            roofingPrimer: item
        });
});

// GET one
api.get('/edit/:id', function (req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingPrimers.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofing_primers/edit.ejs',
        {
            title: "RP",
            layout: "layout.ejs",
            roofingPrimer: item
        });
});


//for acctivate

api.get('/active/:id/:ison', function(req,res){
    console.log("Handling POST /active/:id/:ison " + req);
    var id = parseInt(req.params.id);
    var ison = req.params.ison=="true"?true:false;
    var data = req.app.locals.roofingPrimers.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    item.isactive = ison;
    res.redirect("/roofingPrimer");
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function (req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.roofingPrimers.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/roofingPrimer');
});

// POST update
api.post('/save/:id', function (req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.roofingPrimers.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/roofingPrimer');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function (req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.roofingPrimers.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/roofingPrimer');
});

module.exports = api;

/* 10 controller methods handled by controller:

controllers/roofingPrimers.js

2 Respond with JSON:

http://127.0.0.1:8082/roofingPrimer/findall [WORKING]
http://127.0.0.1:8082/roofingPrimer/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8082/roofingPrimer [WORKING]
http://127.0.0.1:8082/roofingPrimer/create [WORKING]
http://127.0.0.1:8082/roofingPrimer/delete/1 [WORKING]
http://127.0.0.1:8082/roofingPrimer/details/1 [WORKING]
http://127.0.0.1:8082/roofingPrimer/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8082/roofingPrimer/save [WORKING]
http://127.0.0.1:8082/roofingPrimer/save/1 [WORKING]
http://127.0.0.1:8082/roofingPrimer/delete/1 [WORKING]
*/

