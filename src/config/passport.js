const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../model/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://fpt.has.io.vn/v1/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // them user vaof dbsds
      const tokenLogin = uuidv4();
      profile.tokenLogin = tokenLogin;
      try {
        if (profile?.id) {
          let response = await userModel.findOne({ id: profile.id });
          if (!response) {
            await userModel.create({
              id: profile.id,
              email: profile.emails[0]?.value,
              typeLogin: profile?.provider,
              name: profile?.displayName,
              avatarUrl: profile?.photos[0]?.value,
              role: "user",
              tokenLogin,
            });
          } else {
            await userModel.updateOne(
              {
                id: profile.id,
              },
              {
                tokenLogin,
              }
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
      // console.log(profile);
      return cb(null, profile);
    }
  )
);
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "/api/auth/facebook/callback",
//       profileFields: ["email", "photos", "id", "displayName"],
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       const tokenLogin = uuidv4();
//       profile.tokenLogin = tokenLogin;
//       try {
//         if (profile?.id) {
//           let response = await db.User.findOrCreate({
//             where: { id: profile.id },
//             defaults: {
//               id: profile.id,
//               email: profile.emails[0]?.value,
//               typeLogin: profile?.provider,
//               name: profile?.displayName,
//               avatarUrl: profile?.photos[0]?.value,
//               tokenLogin,
//             },
//           });
//           if (!response[1]) {
//             await db.User.update(
//               {
//                 tokenLogin,
//               },
//               {
//                 where: { id: profile.id },
//               }
//             );
//           }
//         }
//       } catch (error) {
//         console.log(error);
//       }
//       // console.log(profile);
//       return cb(null, profile);
//     }
//   )
// );
