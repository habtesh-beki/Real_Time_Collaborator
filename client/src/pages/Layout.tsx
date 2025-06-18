import { socket } from "../App";
import { toast } from "sonner";
import MainSidebar from "../components/MainSidebar";
import EditorPage from "../futures/codeEditor/EditorPage";
import CanvasBoard from "../futures/Drawing/drawingPage";
import { useState } from "react";

export default function Layout() {
  const [codeMode, setCodeMode] = useState(true);

  socket.on("join-success", (data) => {
    toast.success(` ${data.username} Joined !`, {
      duration: 5000,
      action: {
        label: "Dismiss",
        onClick: () => {},
      },
    });
  });

  return (
    <div className="relative">
      <div className="text-2xl flex justify-center items-center bg-(--color-bg-top) text-white py-2">
        Real Time Collaborater code editor and drawing
      </div>
      <div className="flex w-full">
        <MainSidebar setCodeMode={setCodeMode} />
        {codeMode && <EditorPage />}
        {!codeMode && <CanvasBoard />}
      </div>
    </div>
  );
}
