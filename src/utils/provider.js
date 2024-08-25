

const passport = require('passport');
const Users = require('../model/users.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const googleProvider = async () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_LOGIN_CLIENTID,
        clientSecret: process.env.GOOGLE_LOGIN_CLIENTSECRET_KEY,
        callbackURL: "http://localhost:8000/api/v1/users/google/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            console.log("zdf", profile);
            try {
                let user = await Users.findOne({ googleId: profile.id });
                console.log(user);
                if (!user) {
                    user = await Users.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        role: 'user'
                    });
                }
                return cb(null, user);
            } catch (error) {
                return cb(error, null);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (data, done) {
        //   const user = await Users.findOne({ _id: id })

        try {
            // const user = await Users.findById(id);
            done(null, data);
        } catch (err) {
            done(err, null);
        }
    });
};

const fecebookprovider = async () => {
    passport.use(new FacebookStrategy({
        clientID:process.env.FECEBOOK_LOGIN_CLIENTID,
        clientSecret: process.env.FECEBOOK_LOGIN_CLIENTSECRET_KEY,
        callbackURL: "http://localhost:8000/api/v1/users/facebook/callback",
        profileFields: ['id', 'displayName', 'emails']
    },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                let user = await Users.findOne({ facebookId: profile.id });
                console.log(user);
                if (!user) {
                    user = await Users.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        facebookId: profile.id,
                        role: 'user'
                    });
                }
                return cb(null, user);
            } catch (error) {
                return cb(error, null);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const user = await Users.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};

module.exports = {
    googleProvider,
    fecebookprovider
};
