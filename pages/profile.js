import Link from "next/link"
// import cookie from "js-cookie";
import admin from "../config/firebase"

function Profile({logout}) {
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
                        <Link href='/dashboard'><a>DashBoard</a></Link>
                        <a href="#services">Services</a>
                        <a href="#clients">Clients</a>
                        <a href="#contact">Contact</a>
                        <Link href='/'><a onClick={() => logout()}>Log out</a></Link>
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
               <aside>
                    <div className="personal-image">
                        <img src="https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png" alt=""/>
                        <h1>Pesonal Information</h1>
                    </div>
                    <div className="personal-info">
                        <p>First Name:</p> <input type='text' placeholder='Enter First Name' defaultValue=''/>
                        <p>Last Name:</p> <input type='text' placeholder='Enter Last Name' defaultValue=''/>
                        <p>D.O.B:</p> <input type='date' name="birthday" placeholder='Enter Last Name' defaultValue=''/>
                        <p>Gender:</p><select name="gender"  defaultValue="">
								            <option value="Male">Male</option>
								            <option value="Female">Female</option>
							            </select>
                        <p>Nationality:</p> <input type='text' name="Nationality" placeholder='Nationality' defaultValue=''/>
                        <p>Image:</p> <input type='file' alt="submit"  placeholder='image' defaultValue=''/>
                        <button type="submit">Submit</button>

                          <hr/>
                    </div>
               </aside>
            </div>
        </div>
        </>
  )
}

export default Profile

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