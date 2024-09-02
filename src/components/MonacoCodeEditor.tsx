"use client";

import React, { useEffect, useRef, useState } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { Box, HStack, Spinner, Button } from "@chakra-ui/react";
import * as monaco from "monaco-editor";

interface ICodeEditorProps {
    label: string;
    defaultLanguage: string;
    setValue: (val: string) => void;
    isVimMode: boolean;
}

const MonacoCodeEditor = ({
    label,
    defaultLanguage,
    setValue,
    isVimMode,
}: ICodeEditorProps) => {
    const statusbarRef = useRef<HTMLDivElement | null>(null);
    const vimModeRef = useRef<any>(null);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleEditorDidMount: OnMount = (editor, _monaco) => {
        editorRef.current = editor;

        if (!isVimMode) return;

        // setup monaco-vim
        (window.require as any).config({
            paths: {
                "monaco-vim": "https://unpkg.com/monaco-vim/dist/monaco-vim",
            },
        });

        (window as any).require(["monaco-vim"], function (MonacoVim: any) {
            vimModeRef.current = MonacoVim.initVimMode(
                editor,
                statusbarRef.current,
            );
        });
        // *** I KNOW IT'S HORRIBLE BUT IT WORKS ANYWAYS XD ***
    };

    useEffect(() => {
        if (editorRef.current && isVimMode) {
            handleEditorDidMount(editorRef.current, monaco);
        }

        return () => {
            vimModeRef.current?.dispose();
        };
    }, [isVimMode]);

    return (
        <Box
            position="relative"
            w={isCollapsed ? "0px" : "3"}
            h="full"
            flex={isCollapsed ? "0.2" : "1"}
        >
            <HStack
                bg="gray.300"
                p={1}
                fontSize="sm"
                justifyContent={"space-between"}
            >
                <p>{label}</p>
                <Button size="xs" onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? "Expand" : "Collapse"}
                </Button>
            </HStack>
            <Editor
                language={defaultLanguage}
                height={"100%"}
                onMount={handleEditorDidMount}
                loading={<Spinner />}
                options={{
                    minimap: { enabled: false },
                }}
                onChange={(value, _event) => {
                    if (value) {
                        setValue(value);
                    }
                }}
            />
            {isVimMode && (
                <Box
                    position={"absolute"}
                    bg="red.400"
                    w="full"
                    bottom="0"
                    ref={statusbarRef}
                ></Box>
            )}
        </Box>
    );
};

export default React.memo(MonacoCodeEditor);
