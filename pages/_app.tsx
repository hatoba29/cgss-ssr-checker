import type { AppProps } from "next/app"
import Head from "next/head"
import "css/main.scss"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no"
        />
        <title>CGSS SSR Checker</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
