var express = require('express');
var api = express.Router();

// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "about")
// Specify the handler for each required combination of URI and HTTP verb 

// HANDLE VIEW DISPLAY REQUESTS --------------------------------------------

// GET t1
api.get('/t1', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t1/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t1/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t1/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t1/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t1/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t2
api.get('/t2', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t2/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t2/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t2/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t2/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t2/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t3
api.get('/t3', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t3/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t3/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t3/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t3/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t3/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t4
api.get('/t4', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t4/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t4/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t4/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t4/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t4/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t5
api.get('/t5', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t5/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t5/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t5/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t5/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t5/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t6
api.get('/t6', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t6/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t6/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t6/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t6/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t6/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t7
api.get('/t7', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t7/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t7/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t7/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t7/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t7/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t8
api.get('/t8', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t8/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t8/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t8/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t8/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t8/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});


// GET t9
api.get('/t9', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t9/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t9/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t9/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t9/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t9/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t10
api.get('/t10', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t10/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t10/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t10/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t10/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t10/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});


// GET t11
api.get('/t11', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t11/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t11/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t11/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t11/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t11/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t12
api.get('/t12', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t12/index.ejs',
        { title: "TeamName", layout: "layout.ejs" });
});
api.get('/t12/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t12/a/index.ejs',
        { title: "TeamMember1PutYourNameHere", layout: "layout.ejs" });
});
api.get('/t12/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t12/b/index.ejs',
        { title: "TeamMember2PutYourNameHere", layout: "layout.ejs" });
});

// GET t15 - mentors
api.get('/t15', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t15/index.ejs',
        { title: "Mentors", layout: "layout.ejs" });
});
api.get('/t15/a', function(req, res) {
    console.log("Handling GET " + req);
    res.render('about_2017_spring_03/t15/e/index.ejs',
        { title: "Rathnakar Ettedi", layout: "layout.ejs" });
});
api.get('/t15/b', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('about_2017_spring_03/t15/r/index.ejs',
        { title: "Vamsi Ravva", layout: "layout.ejs" });
});

module.exports = api;