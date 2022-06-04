import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import BurgerMenu from '../components/BurgerMenu';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) { // replace "any" with "AppProps"
  const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
  
  const toggleBurgerMenu = () => setShowBurgerMenu(!showBurgerMenu);

  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        <div className="h-screen overflow-y-scroll bg-black scrollbar-hide"> {/* bg-slate-200 */}
          <Header toggleBurgerMenu={toggleBurgerMenu} showBurgerMenu={showBurgerMenu} />
          {showBurgerMenu && <BurgerMenu toggleBurgerMenu={toggleBurgerMenu} />}
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
