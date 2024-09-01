"use client";

import { VStack, HStack, Heading, Switch } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import MonacoCodeEditor from "@/components/MonacoCodeEditor";

export default function CodeEditor() {
    const [html, setHtml] = useState("<!-- Write HTML here -->");
    const [css, setCss] = useState("/* Write CSS here */");
    const [js, setJs] = useState("// Write JavaScript here");
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
                    onChange={(e) => console.log(e.target.checked)}
                >
                    Vim mode
                </Switch>
            </HStack>
            {/* Code Editors */}
            <HStack w="full" p={2} h={"45vh"}>
                <MonacoCodeEditor
                    label={"html"}
                    defaultValue={html}
                    defaultLanguage={"html"}
                    setValue={memoizedSetHtml}
                />
                <MonacoCodeEditor
                    label={"css"}
                    defaultValue={css}
                    defaultLanguage={"css"}
                    setValue={memoizedSetCss}
                />
                <MonacoCodeEditor
                    label={"js"}
                    defaultValue={js}
                    defaultLanguage={"javascript"}
                    setValue={memoizedSetJs}
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
