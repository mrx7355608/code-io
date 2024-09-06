import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { ChakraUIProvider, SessionProvider } from "./providers";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";

const firacode = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Code IO",
    description: "Online HTML CSS and JS editor",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const sessions = await getServerSession();

    return (
        <html lang="en">
            <body className={firacode.className}>
                <ChakraUIProvider>
                    <SessionProvider session={sessions}>
                        <Navbar />
                        {children}
                    </SessionProvider>
                </ChakraUIProvider>
            </body>
        </html>
    );
}
