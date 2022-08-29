import '../styles/globals.css';
import '../styles/dashboard.css';
import '../styles/profile.css';
// import admin from '../config/firebase';
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
// export async function getServerSideProps({req, res}){
//   console.log(admin)
// }