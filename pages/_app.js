import Head from 'next/head';
import '../styles.css';
import ContextProvider from '../context/Context';
import ThemeProvider from '../context/ThemeContext';
import AccountProvider from '../context/AccountContext';
import ProductsProvider from '../context/ProductsContext';
import AdminProvider from '../context/AdminProvider ';
import WebContainer from "../components/WebContainer";
import { Provider as PaperProvider } from 'react-native-paper';
import BottomBar from "../components/BottomBar";

export default function myApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ContextProvider>
        <AccountProvider>
          <ProductsProvider>
            <ThemeProvider>
              <PaperProvider>
                <AdminProvider >
                  <WebContainer>
                    <Component {...pageProps} />
                  </WebContainer>
                </AdminProvider >
              </PaperProvider>
            </ThemeProvider>
          </ProductsProvider>
        </AccountProvider>
      </ContextProvider>
    </>
  )
}