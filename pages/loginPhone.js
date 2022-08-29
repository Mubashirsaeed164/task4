import Link from "next/link"
import Navigation from "../component/navigation/navigation"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useEffect, useState } from "react"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import fire from "../config/fire";
import { useRouter } from "next/router"
import cookie from "js-cookie"
import admin from "../config/firebase"



function LoginPhone() {
    const [number, setNumber] =useState('')
    const auth = getAuth(fire);
    const [otp, setOtp] = useState('')
    // const [flag, setFlag] = useState(false)
    const router = useRouter();

    useEffect(()=> {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit(response);
            console.log(response, 'recap responce')
            }
            }, auth);
    },[])

    const getOtp = (e) => {
        e.preventDefault();
        // const auth = getAuth();
        signInWithPhoneNumber(auth, number, window.recaptchaVerifier)
        .then((confirmationResult) => {
     
        //  const token = cookie.set(phone)
        //  console.log("token", token)
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
     
      // ...
        }).catch((error) => {
            const errorCode = error.code;
            console.log(error)
            alert(errorCode);
        });
        console.log(number)
        }

    const onSignInSubmit = (response) => {
        console.log('callback in recap', response)
        // setFlag(true)
    }

    const verifyOtp = (e) => {
        e.preventDefault();
        if(otp.length > 0) {
        window.confirmationResult.confirm(otp).then(res => {
            console.log("res",res);
            const user = res.user
            console.log("users", user)
            const token = cookie.set("token", user.accessToken)
                console.log(token)
            // debugger;
            router.push('/dashboard')
        }).catch(error => {
            console.log(error)
            // debugger
        })
        console.log(otp);
    }
    }

  return (
    <>
    <div className="container">
    <Navigation/>
    <form onSubmit={getOtp}>                 {/* style={{display: !flag ? "block" : "none"}} */}
    <label id="chk" aria-hidden="true">Login with Phone</label>
        <div className="search">
            <div className="phone-id">
                <PhoneInput 
                defaultCountry="PK"
                value={number}
                onChange={setNumber}
                placeholder="+92 300 02121 21"
                />
                 <div id="recaptcha-container"/>
            </div>
		    <button type="submit">Send OTP</button>
            <Link href='/'><button>Cancel</button></Link>  
        </div>
    </form>

    <form onSubmit={(e) => verifyOtp (e)}>    {/*style={{display: flag ? "block" : "none"}} */}
        <div className="verify-otp">
            <input type='text' placeholder='Enter OTP' onChange={e => setOtp(e.target.value)}/>
		    <button type="submit">Verify OTP</button>            
        </div>
    </form>
    </div>
    </>
  )
}

export default LoginPhone
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

