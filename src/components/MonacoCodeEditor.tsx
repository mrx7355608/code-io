"use client";

import React, { useEffect, useRef } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";
import * as monaco from "monaco-editor";

interface ICodeEditorProps {
    label: string;
    defaultValue: string;
    defaultLanguage: string;
    setValue: (val: string) => void;
}

const MonacoCodeEditor = ({
    label,
    defaultLanguage,
    defaultValue,
    setValue,
}: ICodeEditorProps) => {
    console.log(label + " editor rendering...");
    const statusbarRef = useRef<HTMLDivElement | null>(null);
    const vimModeRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor, _monaco) => {
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
    };

    return (
        <>
            <Editor
                defaultValue={defaultValue}
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
