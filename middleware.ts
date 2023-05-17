// reference: https://next-auth.js.org/configuration/nextjs#middleware
// // export { default } from "next-auth/middleware";
// /*
// export const config = {
//   matcher: "/user/:path*",
// };
// */

export const config = {
  matcher: "/user/:path*",
};

import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signUp:'/auth/signup',
    signIn: '/auth/signin',  
  },
   
})
