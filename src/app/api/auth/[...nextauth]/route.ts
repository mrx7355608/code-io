import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { createNewUser, getUserByEmail } from "@/lib/user.services";
import { IUser } from "@/types/models.types";
import mongoose from "mongoose";

const handler = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    session: {
        maxAge: 48 * 3600, // 2 days
    },

    callbacks: {
        async signIn({ account, profile }) {
            // TODO: handle the case below
            if (!account || !profile) return false;

            // 1. Connect to DB
            await mongoose.connect(process.env.DB_URL!);
            console.log("connected to db");

            // 2. Check if user already exists
            const existingUser = await getUserByEmail(
                profile.email!,
                account.provider,
            );
            if (existingUser) return true;

            console.log("[INFO] Creating new user");

            // 3. If user does not exist then, create a new user
            if (account.provider === "google") {
                const user: IUser = {
                    fullname: profile.name!,
                    email: profile.email!,
                    picture: (profile as any).picture,
                    provider: "google",
                };
                createNewUser(user);
                return true;
            } else if (account.provider === "github") {
                // Create new user entry in database
                const user: IUser = {
                    fullname: (profile as any).login!,
                    email: profile.email!,
                    picture: (profile as any).avatar_url,
                    provider: "github",
                };
                createNewUser(user);
                return true;
            }

            return true;
        },
    },
});

export { handler as GET, handler as POST };
