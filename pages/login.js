import { useState } from "react"
import Navigation from "../component/navigation/navigation"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import admin from "firebase-admin";
import admin from "../config/firebase"
import fire from '../config/fire'
// import admin from "firebase-admin";
import Link from "next/link";
import { useRouter } from "next/router";
import cookie  from 'js-cookie';


function Login({token}) {

    const auth = getAuth(fire);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();


    async function logIn (e) {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);  
        const token =cookie.set("token", user.accessToken)
        console.log(token)
       
        // alert('success fully login')
        router.push('/dashboard')
        // ...
        })
        .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        alert(error)
        // ..
        });
    }

  return (
    <>
    <div className="container">
    <Navigation/>
    <form>
    <label id="chk" aria-hidden="true">Login</label>
    {/* <h3>Token: {token}</h3> */}
        <div className="search">
            <input type="email" name="email" placeholder="Email" required="" onChange={e => setEmail(e.target.value)}/>
            {/* {error ? <p>Enter correct Email</p>:""} */}
            
		    <input type="password" name="pswd" placeholder="Password" required="" onChange={e => setPassword(e.target.value)}/>
            {/* {error ? <p>Invalid Password</p>: ""} */}
            <p className="forgot"><a>Forgot Password?</a></p>
		    <button onClick={(e) => logIn(e)}>Login</button>
        </div>
    </form>
    </div>
    </>
  )
}
export default Login

export async function getServerSideProps({req, res}){ 
  console.log(req.cookies.token)
    let response;
    if(req.cookies.token) {
       response =await admin.auth().verifyIdToken(req.cookies.token).then(resp => {
        console.log(resp);
        return resp;
      })
      console.log("responce is ", response) 
      return {
        redirect: {
          permanent: false,
          destination: '/dashboard',
        },
      } 
    }
    return {
      props: { token: response || '' }
    };
  }
