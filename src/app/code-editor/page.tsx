"use client";

import { VStack, HStack, Heading, Switch } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import MonacoCodeEditor from "@/components/MonacoCodeEditor";

export default function CodeEditor() {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [code, setCode] = useState(
        `
            <html>
                <head></head>
                <style>${css}</style>
                <body>${html}</body>
                <script>${js}</script>
            </html>

        `,
    );
    const [isVimMode, setIsVimMode] = useState(false);
    // TODO: create a custom hook useLocalStorage to save vim-mode and
    // refetch it on page load

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCode(
                `
            <html>
                <head></head>
                <style>${css}</style>
                <body>${html}</body>
                <script>${js}</script>
            </html>

        `,
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
        <VStack h={"100vh"} gap={0}>
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
            </HStack>
            {/* Code Editors */}
            <HStack w="full" p={2} h={"45vh"}>
                <MonacoCodeEditor
                    label={"html"}
                    defaultLanguage={"html"}
                    setValue={memoizedSetHtml}
                    isVimMode={isVimMode}
                />
                <MonacoCodeEditor
                    label={"css"}
                    defaultLanguage={"css"}
                    setValue={memoizedSetCss}
                    isVimMode={isVimMode}
                />
                <MonacoCodeEditor
                    label={"js"}
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
                    height: "50vh",
                    background: "white",
                }}
            ></iframe>
        </VStack>
    );
}
