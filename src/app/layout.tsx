import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const inter = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Code IO",
    description: "Online HTML CSS and JS editor",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
