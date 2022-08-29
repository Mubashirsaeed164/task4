// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { withIronSessionApiRoute } from "iron-session/next";

// import admin from "../config/firebase";

// export default withIronSessionApiRoute(
//  async function handler(req, res) {
//     if(req.method === "POST") {

//   const firebase = admin.auth()
//   // Return promise to handle serverless function timeouts
//   const token = req.body.token;
//   return new Promise( (resolve, reject) => {
//     firebase.verifyIdToken(token)
//     .then(async function(decodeToken){
//       req.session.user = decodeToken;
//       await req.session.save();
//       res.status(200).json({
//         decodeToken
//       })
//     }).catch(error => (
//       console.log(error)
//     ))
//   })
// }},
// {
//   cookieName: "myapp_cookiename",
//   password: "complex_password_at_least_32_characters_long",
//   // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// },
// )

