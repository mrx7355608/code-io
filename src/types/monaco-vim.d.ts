declare module "monaco-vim" {
    import * as monaco from "monaco-editor";
    export function initVimMode(
        editor: monaco.editor.IStandaloneCodeEditor,
        statusBar: HTMLElement | null,
    ): any;
}
