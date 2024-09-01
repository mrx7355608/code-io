"use client";

import React, { useEffect, useRef } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { Box, Spinner } from "@chakra-ui/react";
import * as monaco from "monaco-editor";

interface ICodeEditorProps {
    defaultValue: string;
    defaultLanguage: string;
    setValue: (val: string) => void;
    isVimMode: boolean;
}

const MonacoCodeEditor = ({
    defaultValue,
    defaultLanguage,
    setValue,
    isVimMode,
}: ICodeEditorProps) => {
    const statusbarRef = useRef<HTMLDivElement | null>(null);
    const vimModeRef = useRef<any>(null);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

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
        <Box position="relative" w="full" h="full">
            <Editor
                defaultValue={defaultValue}
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
