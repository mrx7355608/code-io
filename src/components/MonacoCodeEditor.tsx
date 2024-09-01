import React from "react";
import { Editor } from "@monaco-editor/react";

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

    return (
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
    );
};

export default React.memo(MonacoCodeEditor);
