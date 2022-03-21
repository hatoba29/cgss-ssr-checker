import type { AppProps } from "next/app"
import Head from "next/head"
import { Global, css } from "@emotion/react"
import normalize from "emotion-normalize"

const globalStyle = css`
  ${normalize}
  * {
    font-family: "Noto Sans JP";
    box-sizing: border-box;
  }

  body {
    overflow: hidden;
  }

  ul {
    padding-inline-start: 0;
  }

  li {
    list-style: none;
  }
`

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
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </>
  )
}

export default App
