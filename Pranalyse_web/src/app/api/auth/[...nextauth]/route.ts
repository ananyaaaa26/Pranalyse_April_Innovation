import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const handler= NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID??"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET??""
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    // Inside your NextAuth options
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
            try {
                // const response = await fetch("http://localhost:3010/users/signup", {
                // method: "POST",
                // headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({
                //         email: user.email,
                //         method: "google",
                //     }),
                // });

                // if (response.ok) {
                //     return true; // Database sync successful, allow login
                // } else {
                // console.error("Backend returned an error status");
                //     return false; // Reject sign-in (frontend result.ok will be false)
                // }
            } catch (error) {
                console.error("Backend unreachable", error);
                return false; 
            }
            }
            return true;
        },
    },
})

export {handler as GET, handler as POST};