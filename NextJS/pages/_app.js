// import css framework as it requires a separate js file.
import 'tachyons'
//import 'bulma/css/bulma.css'
import "../public/additional.css"

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}