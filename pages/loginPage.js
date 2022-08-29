import Link from "next/link"
function LoginPage() {
    return (
      <>
     
          <div className="container">
        <div className='header'>
          <h1>Welcome</h1>
        </div>
        <div className='main'>
          <nav>
            <ul>
                <Link href='/login'><li>LogIn with Email</li></Link>
                <Link href='/loginPhone'><li>LogIn with Phone Number</li></Link>
                <Link href='signup'><li>Sign Up</li></Link>
                {/* <Link href='/ruh'><li>Ruh</li></Link> */}
            </ul>
          </nav>
        </div>
        <div className='image'>
          <img src="https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg?cs=srgb&dl=pexels-reynaldo-brigworkz-brigantty-771881.jpg&fm=jpg" alt=""/>
          <div className='content'>
            <h1>Unmissable Adventure Tours With Your Friends</h1>
          </div>
        </div>
     </div>
      </>
    )
  }
  
  export default LoginPage

