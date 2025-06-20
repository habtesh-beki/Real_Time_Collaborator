import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { socket } from "../../App";
import { useEffect, useState } from "react";

interface IModelContentChangedEvent {
  readonly changes: monaco.editor.IModelContentChange[];
  readonly eol: string;
  readonly versionId: number;
  readonly isUndoing: boolean;
  readonly isRedoing: boolean;
  readonly isFlush: boolean;
}
export default function EditorPage() {
  const [code, setNewCode] = useState("//start coding...");
  function handleEditorChange(
    value: string | undefined,
    event: IModelContentChangedEvent
  ) {
    console.log("this is event", event);
    socket.emit("updated-code", value);
  }
  useEffect(() => {
    socket.on("updated-code", (code: string) => {
      setNewCode(code);
      console.log(code);
    });
  });
  return (
    <Editor
      height="100vh"
      width="100%"
      defaultLanguage="javascript"
      value={code}
      theme="vs-dark"
      onChange={handleEditorChange}
    />
  );
}
