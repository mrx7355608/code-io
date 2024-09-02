"use client";

import {
    VStack,
    HStack,
    Heading,
    Switch,
    useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import MonacoCodeEditor from "@/components/MonacoCodeEditor";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function CodeEditor() {
    // TODO: create a custom hook useLocalStorage to save vim-mode and
    // refetch it on page load
    const [isVimMode, setIsVimMode] = useState(false);
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [code, setCode] = useState(
        `<html>
            <head></head>
            <style>${css}</style>
            <body>${html}</body>
            <script>${js}</script>
        </html>`,
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCode(
                `<html>
                    <head></head>
                    <style>${css}</style>
                    <body>${html}</body>
                    <script>${js}</script>
                </html>`,
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    console.log("rendering...");

    const memoizedSetHtml = useCallback((value: string) => {
        setHtml(value);
    }, []);
    const memoizedSetCss = useCallback((value: string) => {
        setCss(value);
    }, []);
    const memoizedSetJs = useCallback((value: string) => {
        setJs(value);
    }, []);

    return (
        <VStack h={"100vh"} gap={0} bg={useColorModeValue("#eee", "#2d2d2d")}>
            <HStack p={2} bg="white" w="full" px={3}>
                <Heading fontSize={"2xl"} marginRight={"5"}>
                    Project Name
                </Heading>
                <Switch
                    colorScheme="purple"
                    onChange={(e) => setIsVimMode(e.target.checked)}
                >
                    Vim mode
                </Switch>
                <DarkModeToggle />
            </HStack>
            {/* Code Editors */}
            <HStack w="full" p={2} h={"45vh"}>
                <MonacoCodeEditor
                    label={"Html"}
                    defaultLanguage={"html"}
                    setValue={memoizedSetHtml}
                    isVimMode={isVimMode}
                />
                <MonacoCodeEditor
                    label={"Css"}
                    defaultLanguage={"css"}
                    setValue={memoizedSetCss}
                    isVimMode={isVimMode}
                />
                <MonacoCodeEditor
                    label={"JS"}
                    defaultLanguage={"javascript"}
                    setValue={memoizedSetJs}
                    isVimMode={isVimMode}
                />
            </HStack>

            {/* Code Preview */}
            <iframe
                srcDoc={code}
                style={{
                    width: "100%",
                    height: "43vh",
                    background: "white",
                    overflow: "auto",
                    marginTop: "auto",
                }}
            ></iframe>
        </VStack>
    );
}
