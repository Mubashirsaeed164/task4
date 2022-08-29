import Link from "next/link"
import { useState } from "react"
import Navigation from "../component/navigation/navigation"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import fire from "../config/fire";
import { useRouter } from "next/router";
import cookie  from 'js-cookie';
import admin from "../config/firebase"



function SignUp() {
  const [userName, setUserName] =useState('')
  const [email, setEmail] =useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const auth = getAuth(fire);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userName.length==0){
        setError(true)
    }
    console.log(userName);
}

  const signUp = () =>{
    createUserWithEmailAndPassword(auth, email, password, phoneNumber)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      const token =cookie.set("token", user.accessToken)
      console.log(token)
      router.push('/dashboard')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    
  }

  return (
    <>
     <div className="container">
    <Navigation/>
    <form onSubmit={handleSubmit}>
    <label id="chk" aria-hidden="true">Sign up</label>
        <div className="search">
          <input type="text" name="txt" placeholder="User name" required="" onChange={e => setUserName(e.target.value)}/>
          {error ? <p>Enter username</p>: ''}
          <input type="tel" id="phone" name="Phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone number" required="" onChange={e => setPhoneNumber(e.target.value)}/>
          {error ? <p>Enter Phone Number</p>: ''}
					<input type="email" name="email" placeholder="Email" required="" onChange={e => setEmail(e.target.value)}/>
          {error ? <p>Enter Email</p>: ''}
					<input type="password" name="pswd" placeholder="Password" required="" onChange={e => setPassword(e.target.value)}/>
          {error ? <p>Password</p>: ''}
		    <button onClick={signUp}>Sign up</button>
        </div>
    </form>
    </div>
    </>
  )
}

export default SignUp
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