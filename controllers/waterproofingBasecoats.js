//Dev Team-p4-6
//Jyothsna Pala
//Bhavishya Arelli


var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/waterproofingBasecoat.js');
const notfoundstring = 'No such waterproofing Basecoat';

// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "waterproofingBasecoat")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DEvarE)

// HANDLE JSON REQUESTS --------------------------------------------

api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.waterproofingBasecoats.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});

// HANDLE VIEW DISPLAY REQUESTS --------------------------------------------

// GET all
api.get('/', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('waterproofing_basecoats/index.ejs',
        { title: "WP Basecoat", layout: "layout.ejs" });
});

// GET create
api.get("/create", function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("waterproofing_basecoats/create.ejs",
        { title: "WP Basecoat", layout: "layout.ejs" });
});

// GET /delete/:id
api.get('/devare/:id', function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('waterproofing_basecoats/delete.ejs',
        {
            title: "WP Basecoat",
            layout: "layout.ejs",
            waterproofingBasecoat: item
        });
});

//Delete Get
api.get('/delete/:id', function (req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('waterproofing_basecoats/delete.ejs',
        {
            title: "WP Basecoat",
            layout: "layout.ejs",
            waterproofingBasecoat :item  
        });     
});

// GET /details/:id
api.get('/details/:id', function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('waterproofing_basecoats/details.ejs',
        {
            title: "WP Basecoat",
            layout: "layout.ejs",
            waterproofingBasecoat: item
        });
});

// GET one
api.get('/edit/:id', function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('waterproofing_basecoats/edit.ejs',
        {
            title: "WP Basecoat",
            layout: "layout.ejs",
           waterproofingBasecoat: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.waterproofingBasecoats.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/waterproofingBasecoat');
});

// POST update
api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.waterproofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/waterproofingBasecoat');
});



// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.waterproofingBasecoats.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Devared item " + JSON.stringify(item));
    return res.redirect('/waterproofingBasecoat');
});


module.exports = api;
/* 10 controller methods handled by controller:

controllers/roofingBasecoats.js

2 Respond with JSON:

http://localhost:8082/waterproofingBasecoat/findall [WORKING]
http://localhost:8082/waterproofingBasecoat/findone/1 [WORKING]

5 Respond with CRUD Views:

http://localhost:8082/waterproofingBasecoat [WORKING]
http://localhost:8082/waterproofingBasecoat/create [WORKING]
http://localhost:8082/waterproofingBasecoat/delete/1 [WORKING]
http://localhost:8082/waterproofingBasecoat/details/1 [WORKING]
http://localhost:8082/waterproofingBasecoat/edit/1[WORKING]

3 Respond by executing CRUD actions:

http://localhost:8082/waterproofingBasecoat/save [NOT-WORKING]
http://localhost:8082/waterproofingBasecoat/save/1 [NOT-WORKING]
http://localhost:8082/waterproofingBasecoat/delete/1 [WORKING]
*/