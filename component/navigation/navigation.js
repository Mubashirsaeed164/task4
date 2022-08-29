import Link from "next/link"

function Navigation() {
  return (
    <>
    <div className="nav-bar">
      <nav>
        <ul>
          <Link href='/loginPage'><li>LOGIN</li></Link>
          <Link href='/signup'><li>SIGN UP</li></Link>
        </ul>
      </nav>
    </div>
    </>
  )
}

export default Navigation