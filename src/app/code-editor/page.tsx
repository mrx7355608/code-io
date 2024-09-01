"use client"

import { VStack, HStack } from "@chakra-ui/react"
import { useState } from "react"

export default function CodeEditor() {
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [js, setJs] = useState("")
    const [code, setCode] = useState(
        `
            <html>
                <head></head>
                <style>${css}</style>
                <body>${html}</body>
                <script>${js}</script>
            </html>

        `
    );

    return (
        <VStack>
            { /* Code Editors */}
            <HStack>
                { /* HTML */}
                { /* CSS */}
                { /* JS */}
            </HStack>

            { /* Code Preview */}
            <iframe></iframe>
        </VStack>
    )
}
