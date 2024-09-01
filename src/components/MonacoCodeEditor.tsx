"use client";

import React, { useEffect, useRef } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";
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
    console.log(label + " editor rendering...");
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
        if (editorRef.current) {
            handleEditorDidMount(editorRef.current, monaco);
        }

        return () => {
            // editorRef.current?.dispose();
            vimModeRef.current?.dispose();
        };
    }, [isVimMode]);

    return (
        <>
            <Editor
                defaultLanguage={defaultLanguage}
                height={"100%"}
                onMount={handleEditorDidMount}
                onChange={(value, _event) => {
                    if (value) {
                        setValue(value);
                    }
                }}
            />
            <Box ref={statusbarRef}></Box>
        </>
    );
};

export default React.memo(MonacoCodeEditor);
