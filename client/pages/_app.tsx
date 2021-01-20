import '../styles/main.scss'
import Head from 'next/head';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
