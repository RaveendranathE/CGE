// P2-10 Jordan Nazario && Hunter Turley

var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/prospect.js');
const notfoundstring = 'No prospects';


// see app.js for the root request this controller handles
// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "prospect")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DELETE)

// HANDLE JSON REQUESTS --------------------------------------------

api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.prospects.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.prospects.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});



// HANDLE VIEW DISPLAY REQUESTS --------------------------------------------

// GET all
api.get('/', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('prospect/index.ejs',
        { title: "Prospects", layout: "layout.ejs" });
});

// GET create
api.get("/create", function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("prospect/create.ejs",
        { title: "Prospects", layout: "layout.ejs" });
});

// GET /delete/:id
api.get('/delete/:id', function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.prospects.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('prospect/delete.ejs',
        {
            title: "Prospects",
            layout: "layout.ejs",
            prospect: item
        });
});
// GET /details/:id
api.get('/details/:id', function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.prospects.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('prospect/details.ejs',
        {
            title: "Prospects",
            layout: "layout.ejs",
            prospect: item
        });
});

// GET one
api.get('/edit/:id', function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.prospects.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('prospect/edit.ejs',
        {
            title: "Prospects",
            layout: "layout.ejs",
            prospect: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.prospects.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.customerName = req.body.customerName;
    item.address = req.body.address;
    item.city = req.body.city;
    item.state = req.body.state;
    item.zip = req.body.zip;
    item.sqft = parseInt(req.body.sqft);
    item.customerType = req.body.customerType;
    item.contact = req.body.contact;
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/prospect');
});

// POST update
api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.prospects.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.customerName = req.body.customerName;
    item.address = req.body.address;
    item.city = req.body.city;
    item.state = req.body.state;
    item.zip = req.body.zip;
    item.sqft = parseInt(req.body.sqft);
    item.customerType = req.body.customerType;
    item.contact = req.body.contact;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/prospect');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.prospects.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/prospect');
});



module.exports = api;

/* 10 controller methods handled by controller:

controllers/prospects.js

2 Respond with JSON:

http://127.0.0.1:8082/prospect/findall [WORKING]
http://127.0.0.1:8082/prospect/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8082/prospect [WORKING]
http://127.0.0.1:8082/prospect/create [WORKING]
http://127.0.0.1:8082/prospect/delete/1 [WORKING]
http://127.0.0.1:8082/prospect/details/1 [WORKING]
http://127.0.0.1:8082/prospect/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8082/prospect/save [WORKING]
http://127.0.0.1:8082/prospect/save/1 [WORKING]
http://127.0.0.1:8082/prospect/delete/1 [WORKING]
*/
