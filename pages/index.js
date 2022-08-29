import Link from 'next/link'
import LoginPage from './loginPage'
import Ruh from './ruh'


export default function Home() {
  return (    
    <>
    <LoginPage/>
    <Ruh/>
    {/* <div className="container">
      <div className='header'>
        <h1>Welcome</h1>
      </div>
      <div className='main'>
        <nav>
          <ul>
            <Link href='/loginPage'><li>LogIn</li></Link>
            <Link href='/signup'><li>SignUp</li></Link>            
          </ul>
        </nav>
      </div>
      <div className='image'>
        <img src="https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg?cs=srgb&dl=pexels-reynaldo-brigworkz-brigantty-771881.jpg&fm=jpg" alt=""/>
        <div className='content'>
          <h1>Unmissable Adventure Tours With Your Friends</h1>
        </div>
      </div>
   </div> */}
   </>
  )
}
