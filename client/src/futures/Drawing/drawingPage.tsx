import { Excalidraw } from "@excalidraw/excalidraw";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import "@excalidraw/excalidraw/index.css";
import { useEffect, useState } from "react";
import { socket } from "../../App";
import {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types";

export default function CanvasBoard() {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const handleChange = (
    excalidrawElements: readonly OrderedExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    const { collaborators, ...appStateWithoutCollaborators } = appState;
    socket.emit("excalidraw-changes", {
      elements: excalidrawElements,
      appState: appStateWithoutCollaborators,
      files,
    });
  };

  useEffect(() => {
    if (!excalidrawAPI) return;

    const updateFromRemote = (data: {
      elements: readonly OrderedExcalidrawElement[];
      appState: AppState;
      files: BinaryFiles;
    }) => {
      excalidrawAPI.updateScene({
        elements: data.elements,
        appState: data.appState,
      });
    };

    socket.on("remote-update", updateFromRemote);

    return () => {
      socket.off("remote-update", updateFromRemote);
    };
  }, [excalidrawAPI]);

  return (
    <div className="w-full h-screen">
      <Excalidraw
        onChange={handleChange}
        isCollaborating={true}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
      />
    </div>
  );
}
