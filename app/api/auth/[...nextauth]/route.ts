import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/models/User";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDatabase();
                const user = await User.findOne({ email: credentials?.email });

                if (!user) throw new Error("User not found");

                const isPasswordValid = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );

                if (!isPasswordValid) throw new Error("Invalid credentials");

                return { id: user.id, email: user.email };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
