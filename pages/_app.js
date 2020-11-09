import Head from 'next/head'

import ContextProvider from '../context/Context'
import { ThemeProvider } from 'react-native-elements';
import theme from '../theme'
import BottomBar from "../components/BottomBar";
import WebContainer from "../components/WebContainer";
import { Provider as PaperProvider } from 'react-native-paper';

export default function myApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContextProvider>
        <PaperProvider>
          <ThemeProvider theme={theme}>
            <WebContainer>
              <Component {...pageProps} />
            </WebContainer>
          </ThemeProvider>
        </PaperProvider>
      </ContextProvider>
    </>
  )
}