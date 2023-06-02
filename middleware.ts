// reference: https://next-auth.js.org/configuration/nextjs#middleware

export const config = {
  matcher: ['/profile/:path*','/employee/:path*'],

};

import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signUp:'/auth/signup',
    signIn: '/auth/signin', 
  },
   
})
