"use client";

import React, { useEffect, useRef } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { initVimMode } from "monaco-vim";
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
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    return (
        <>
            <Editor
                defaultValue={defaultValue}
                defaultLanguage={defaultLanguage}
                height={"100%"}
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
