"use client";
import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import theme from "./theme";
import { SessionProvider } from "next-auth/react";

export function ChakraUIProvider({ children }: { children: React.ReactNode }) {
    return (
        <CacheProvider>
            <ChakraProvider theme={theme}>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                {children}
            </ChakraProvider>
        </CacheProvider>
    );
}

export { SessionProvider };
