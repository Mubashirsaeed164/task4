import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import fire from "../config/fire";
import cookie from "js-cookie";
import admin from "../config/firebase"
import { useRouter } from "next/router";

function Dashboard({token}) {
    const router = useRouter()
    // console.log("the token is: ", token)
        const auth = getAuth(fire);
        const logOut = () => {
            signOut(auth).then(() => {
            // debugger
            cookie.remove("token")
            // window.location.href = '/loginPage'
            router.push('/loginPage')
            // Sign-out successful.
            }).catch((error) => {
                console.log(error);
            // An error happened.
            });
        }
    if (token === 'invalid'){
        logOut()
    }
    return (
        <>
        <div className="container">
            <div className="side-bar">
                <div className="profile-image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYInlcLz-tohmDcaurwEy29Bk94eg1075l0Q&usqp=CAU" alt=""/>                
                </div>
                <div className="profile-name">
                    <h3>Jhon Doe</h3>
                    <i>Lorem ipsum dolor sit amet consectetur.</i>
                </div>
                <div className="nav-bar">
                    <div className="sidenav">
                        <Link href='/profile'><a href="#profile">Profile</a></Link>
                        <a href="#services">Services</a>
                        <a href="#clients">Clients</a>
                        <a href="#contact">Contact</a>
                        <Link href='/'><a onClick={()=>logOut()}>Log out</a></Link>
                        <div className="dropdown">
                            <a className="dropbtn">Dropdown</a>
                            <div className="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main">
                <h2>Authenticate with Firebase with a Phone Number Using JavaScrip</h2>
                <aside>
                    <p>
                        You can use Firebase Authentication to sign in a user by sending an SMS message to the users phone.
                        The user signs in using a one-time code contained in the SMS message.
                        The easiest way to add phone number sign-in to your app is to use FirebaseUI, 
                        which includes a drop-in sign-in widget that implements sign-in flows for phone number sign-in,
                        as well as password-based and federated sign-in. 
                        This document describes how to implement a phone number sign-in flow using the Firebase SDK.
                    </p>
                    <h3>Security Concern</h3>
                    <p>
                        Authentication using only a phone number, while convenient,
                        is less secure than the other available methods, because possession of a phone
                        number can be easily transferred between users.
                        Also, on devices with multiple user profiles, any user that can receive SMS messages can
                        sign in to an account using the devices phone number.
                        If you use phone number based sign-in in your app, you should offer it alongside more secure sign-in methods,
                        and inform users of the security tradeoffs of using phone number sign-in.
                    </p>
                </aside>
            
            </div>
        </div>
        </>
    )
}

export default Dashboard;

export async function getServerSideProps({req, res}){
    console.log(req.cookies.token)
    let response;
    if(req.cookies.token) {
        response = await admin.auth().verifyIdToken(req.cookies.token).then(res => {
            console.log(res)
            return {
                redirect: {
                  permanent: false,
                  destination: '/dashboard', 
                },
              }
        })
        .catch(error => {
            console.log(error)
            return response = 'invalid'
        })
        console.log(response)
    }
    else {
        response = "" || null 
        return {
            redirect: {
                permanent: false,
                destination: '/loginPage',
            },
        }
    }
    return {
      props: { token: response || ""}
    };
}