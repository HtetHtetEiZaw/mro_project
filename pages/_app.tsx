import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "../layout/Layout";
import { useRouter } from 'next/router';

//function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  
  const router = useRouter();
  const currentPath = router.pathname;

   if(currentPath === '/auth/signin' || currentPath === '/auth/signup') {
    return(
      <SessionProvider session={pageProps.session}>
         <Component {...pageProps} />
       </SessionProvider>
    )
   } 

  //  if(currentPath === '/register/SignUp') {
  //   return(
  //        <Component {...pageProps} />
  //   )
  //  } 

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    
  );
  
}

export default MyApp;
