// Controllers (route handlers).
global.homeController = require('../controllers/home');
global.userController = require('../controllers/user');
global.apiController = require('../controllers/api');
global.contactController = require('../controllers/contact');

// API keys and Passport configuration.
const passportConfig = require('../config/passport');


module.exports = {
    defineRoutes : function(){
        // Request to this URI will be handled by this CONTROLLER..........
        app.use('/', require('../controllers/index.js'));
        app.use('/about_2016_fall_03', require('../controllers/about_2016_fall_03.js'));
        app.use('/about_2016_fall_04', require('../controllers/about_2016_fall_04.js'));
        app.use('/about_2016_fall_05', require('../controllers/about_2016_fall_05.js'));
        app.use('/about_2016_fall_06', require('../controllers/about_2016_fall_06.js'));
        app.use('/about_2017_spring_02', require('../controllers/about_2017_spring_02.js'));
        app.use('/about_2017_spring_03', require('../controllers/about_2017_spring_03.js'));
        app.use('/about_2017_spring_04', require('../controllers/about_2017_spring_04.js'));
        app.use('/aggregate', require('../controllers/aggregateMaterials.js'));
        app.use('/flooringCoating', require('../controllers/flooringCoatings.js'));
        app.use('/flooringEstimate', require('../controllers/flooringEstimate.js'));
        app.use('/mileageRate', require('../controllers/mileageRate.js'));
        app.use('/prospect', require('../controllers/prospects.js'));
        app.use('/roofingBasecoat', require('../controllers/roofingBasecoats.js'));
        app.use('/roofingCoating', require('../controllers/roofingCoatings.js'));
        app.use('/roofingEstimate', require('../controllers/roofingEstimate.js'));
        app.use('/roofingPrimer', require('../controllers/roofingPrimers.js'));
        app.use('/roofingTopcoat', require('../controllers/roofingTopcoats.js'));
        app.use('/waterproofingBasecoat', require('../controllers/waterproofingBasecoats.js'));
        app.use('/waterproofingEstimate', require('../controllers/waterproofingEstimate.js'));
        app.use('/waterproofingPrimer', require('../controllers/waterproofingPrimers.js'));
        app.use('/waterproofingTopcoat', require('../controllers/waterproofingTopcoats.js'));
    },


    definePrimaryAppRoutes: function(){
        app.get('/', homeController.index);
        app.get('/login', userController.getLogin);
        app.post('/login', userController.postLogin);
        app.get('/logout', userController.logout);
        app.get('/forgot', userController.getForgot);
        app.post('/forgot', userController.postForgot);
        app.get('/reset/:token', userController.getReset);
        app.post('/reset/:token', userController.postReset);
        app.get('/signup', userController.getSignup);
        app.post('/signup', userController.postSignup);
        app.get('/contact', contactController.getContact);
        app.post('/contact', contactController.postContact);
        app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
        app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
        app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
        app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
        app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
    },

    defineApiRoutes: function(){
        app.get('/api', apiController.getApi);
        app.get('/api/lastfm', apiController.getLastfm);
        app.get('/api/nyt', apiController.getNewYorkTimes);
        app.get('/api/aviary', apiController.getAviary);
        app.get('/api/steam', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getSteam);
        app.get('/api/stripe', apiController.getStripe);
        app.post('/api/stripe', apiController.postStripe);
        app.get('/api/scraping', apiController.getScraping);
        app.get('/api/twilio', apiController.getTwilio);
        app.post('/api/twilio', apiController.postTwilio);
        app.get('/api/clockwork', apiController.getClockwork);
        app.post('/api/clockwork', apiController.postClockwork);
        app.get('/api/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
        app.get('/api/tumblr', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTumblr);
        app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
        app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
        app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
        app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
        app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
        app.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
        app.get('/api/paypal', apiController.getPayPal);
        app.get('/api/paypal/success', apiController.getPayPalSuccess);
        app.get('/api/paypal/cancel', apiController.getPayPalCancel);
        app.get('/api/lob', apiController.getLob);
        app.get('/api/upload', apiController.getFileUpload);
        app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
        app.get('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getPinterest);
        app.post('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postPinterest);
        app.get('/api/google-maps', apiController.getGoogleMaps);
    },

    defineAuthenticationRoutes : function(){
        app.get('/auth/instagram', passport.authenticate('instagram'));
        app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
        res.redirect(req.session.returnTo || '/');
        });
        app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
        app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
        res.redirect(req.session.returnTo || '/');
        });
        app.get('/auth/github', passport.authenticate('github'));
        app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
        res.redirect(req.session.returnTo || '/');
        });
        app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
        app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
        res.redirect(req.session.returnTo || '/');
        });
        app.get('/auth/twitter', passport.authenticate('twitter'));
        app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
        res.redirect(req.session.returnTo || '/');
        });
        app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
        app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
        res.redirect(req.session.returnTo || '/');
        });
    },

    defineAuthorizationRoutes : function(){
        app.get('/auth/foursquare', passport.authorize('foursquare'));
        app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
        res.redirect('/api/foursquare');
        });
        app.get('/auth/tumblr', passport.authorize('tumblr'));
        app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
        res.redirect('/api/tumblr');
        });
        app.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
        app.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), (req, res) => {
        res.redirect(req.session.returnTo || '/');
        });
        app.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
        app.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/api/pinterest');
        });
    }
}