import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

import User from '@models/user';
import { connectToDB } from '@utils/database'

// console.log(
//     process.env.GOOGLE_ID,
//     process.env.GOOGLE_CLIENT_SECRET

// )

const handler = NextAuth({
    // handler is a class
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async session({ session }) {
            // keep user data in a running session
            // update Session to know witch user is online
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            // every next js route is a serverless route, that means it is a lamda function 
            // that open up when it is called (--> variables, lifecycle, database connection)
            try {
                await connectToDB();
                // check if a user already exists
                // User is an instance of the model class from the mongoose library and findOne
                // is obviously an async method within that class
                const userExists = await User.findOne({
                    email: profile.email
                });
                // if not, create a user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }

    }

})

export { handler as GET, handler as POST }