import Head from 'next/head';
import '../styles.css';
import ContextProvider from '../context/Context';
import ThemeProvider from '../context/ThemeContext';
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
        <ThemeProvider>
          <PaperProvider>
            <WebContainer>
              <Component {...pageProps} />
            </WebContainer>
          </PaperProvider>
        </ThemeProvider>
      </ContextProvider>
    </>
  )
}