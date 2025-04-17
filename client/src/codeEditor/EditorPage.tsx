import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

interface IModelContentChangedEvent {
  readonly changes: monaco.editor.IModelContentChange[];
  readonly eol: string;
  readonly versionId: number;
  readonly isUndoing: boolean;
  readonly isRedoing: boolean;
  readonly isFlush: boolean;
}
export default function EditorPage() {
  function handleEditorChange(
    value: string | undefined,
    event: IModelContentChangedEvent
  ) {
    console.log("here is the current model value:", value);
  }
  return (
    <Editor
      height="100vh"
      width="100"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      theme="vs-dark"
      onChange={handleEditorChange}
    />
  );
}
