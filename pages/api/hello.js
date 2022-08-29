// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import admin from "../../config/firebase"
export default async function handler(req, res) {
  const firebase = admin.auth()
  // Return promise to handle serverless function timeouts
  return new Promise((resolve, reject) => {
    firebase.verifyIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6ImE4YmZhNzU2NDk4ZmRjNTZlNmVmODQ4YWY5NTI5ZThiZWZkZDM3NDUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9naW4tMjhjMzgiLCJhdWQiOiJsb2dpbi0yOGMzOCIsImF1dGhfdGltZSI6MTY2MTQwNjkyMCwidXNlcl9pZCI6InRlSDFXZ2g2a2RRdVZzN1ZkeHJ4RzZ1UVM5TjIiLCJzdWIiOiJ0ZUgxV2doNmtkUXVWczdWZHhyeEc2dVFTOU4yIiwiaWF0IjoxNjYxNDA2OTIwLCJleHAiOjE2NjE0MTA1MjAsImVtYWlsIjoiemFzaGFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ6YXNoYW5AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.VvRlll89zxGViIbgE9sEhvqH31uihIUYZAVlBXfIulqRNyrXt5qEmkKslPZ5ZEspAOpHG1f1lcy-pPY3QQ8dQZfHhaytIIypL3jCO8X5GeMchnvbWE5ETmNQqN-bjFNej-zOS7wcK4oCyDBPer1B2OjEZ8obnu1hGHv-LPhcu5cRrUuPzxAcXD8dv2dDad1xe_2pWXoNrjuKFCI00zS23xDXM4CvIuSOHcgufWJXROCzIeTQBDm1MZ-NY_BPnJGsA_XL7j2Rm78CzbThpVWnl5zlJl5TunD9wTNQz424HAh-C79arq8-1qM-H8-aP2QvwHm9sqb9UOdpsTDWvJwYlw")
    .then(function(decodeToken){
      console.log(decodeToken.accessToken)
    }).catch(error => (
      console.log(error)
    ))
    console.log(firebase)
  })
}
