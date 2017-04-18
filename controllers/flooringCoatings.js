// P2-8
// ShivaTeja Miyapuram, Manohar Sriram
var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/flooringCoating.js');
const notfoundstring = 'No such FLooring Coatings';

// GET to this controller root URI
api.get("/", function (req, res) {
    return res.render('flooring_coatings/index.ejs');
});

api.get('/findall', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.flooringCoatings.query;
    res.send(JSON.stringify(data));
});
api.get('/findone/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.flooringCoatings.query;
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
    response.render("flooring_coatings/create.ejs");
});

//GET /delete/:id 

api.get('/delete/:id', function (req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.flooringCoatings.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('flooring_coatings/delete.ejs',
        {
            title: "FC",
            layout: "layout.ejs",
            flooringCoating: item
        });
});

// GET /details/:id
api.get('/details/:id', function (req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.flooringCoatings.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('flooring_coatings/details.ejs',
        {
            title: "FC",
            layout: "layout.ejs",
            flooringCoating: item
        });
});

// GET one
api.get('/edit/:id', function (req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.flooringCoatings.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('flooring_coatings/edit.ejs',
        {
            title: "FC",
            layout: "layout.ejs",
            flooringCoating: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function (req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.flooringCoatings.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/flooringCoating');
});

// POST update
api.post('/save/:id', function (req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.flooringCoatings.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/flooringCoating');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function (req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.flooringCoatings.query;
    
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/flooringCoating');
});

module.exports = api;

/* 10 controller methods handled by controller:

controllers/flooringCoating.js

2 Respond with JSON:

http://127.0.0.1:8081/flooringCoating/findall [WORKING]
http://127.0.0.1:8081/flooringCoating/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8081/flooringCoating [WORKING]
http://127.0.0.1:8081/flooringCoating/create [WORKING]
http://127.0.0.1:8081/flooringCoating/delete/1 [WORKING]
http://127.0.0.1:8081/flooringCoating/details/1 [WORKING]
http://127.0.0.1:8081/flooringCoating/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8081/flooringCoating/save [WORKING]
http://127.0.0.1:8081/flooringCoating/save/1 [WORKING]
http://127.0.0.1:8081/flooringCoating/delete/1 [WORKING]
*/

