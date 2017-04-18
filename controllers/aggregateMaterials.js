// P3-9 
// Sandeep Mulakala, David Schmitt
var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/aggregateMaterial.js');
const notfoundstring = 'No such aggregate material';

// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "aggregateMaterial")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DELETE)

// HANDLE JSON REQUESTS --------------------------------------------

api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.aggregateMaterials.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.aggregateMaterials.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});

// HANDLE VIEW DISPLAY REQUESTS --------------------------------------------

// GET all
api.get('/', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('aggregate/index.ejs',
        { title: "Aggregate Materials", layout: "layout.ejs" });
});

// GET create
api.get("/create", function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("aggregate/create.ejs",
        { title: "Aggregate Materials", layout: "layout.ejs" });
});

// GET /delete/:id
api.get('/delete/:id', function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.aggregateMaterials.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('aggregate/delete.ejs',
        {
            title: "Aggregate Materials",
            layout: "layout.ejs",
            aggregateMaterial: item
        });
});

// GET /details/:id
api.get('/details/:id', function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.aggregateMaterials.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('aggregate/details.ejs',
        {
            title: "Aggregate Materials",
            layout: "layout.ejs",
            aggregateMaterial: item
        });
});

// GET one
api.get('/edit/:id', function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.aggregateMaterials.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('aggregate/edit.ejs',
        {
            title: "Aggregate Materials",
            layout: "layout.ejs",
            aggregateMaterial: item
        });
});
//Active-Deactive button

api.get('/active/:id/:ison', function(req,res){
    console.log("Handling POST /active/:id/:ison " + req);
    var id = parseInt(req.params.id);
    var ison = req.params.ison=="true"?true:false;
    var data = req.app.locals.aggregateMaterials.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    item.isactive = ison;
    res.redirect("/aggregate");
});
// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.aggregateMaterials.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/aggregate');
});

// POST update
api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.aggregateMaterials.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/aggregate');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.aggregateMaterials.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/aggregate');
});

module.exports = api;

/* 10 controller methods handled by controller:

controllers/roofingBasecoats.js

2 Respond with JSON:

http://localhost:8082/aggregate/findall [WORKING]
http://localhost:8082/aggregate/findone/1 [WORKING]

5 Respond with CRUD Views:

http://localhost:8082/aggregate [WORKING]
http://localhost:8082/aggregate/create [WORKING]
http://localhost:8082/aggregate/delete/1 [WORKING]
http://localhost:8082/aggregate/details/1 [WORKING]
http://localhost:8082/aggregate/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://localhost:8082/aggregate/save [WORKING]
http://localhost:8082/aggregate/save/1 [WORKING]
http://localhost:8082/aggregate/delete/1 [WORKING]
*/
