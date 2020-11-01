import Head from 'next/head'

import ContextProvider from '../context/Context'
import { ThemeProvider } from 'react-native-elements';
import theme from '../theme'

export default function myApp({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ContextProvider>
    </>
  )
}