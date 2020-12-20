import Head from 'next/head';
import '../styles.css';
import ContextProvider from '../context/Context';
import ThemeProvider from '../context/ThemeContext';
import AccountProvider from '../context/AccountContext';
import ProductsProvider from '../context/ProductsContext';
import AdminProvider from '../context/AdminContext';
import WebContainer from "../components/WebContainer";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark: false
};

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
                <PaperProvider theme={theme}>
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