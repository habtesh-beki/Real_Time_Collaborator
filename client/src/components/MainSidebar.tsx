import { Tooltip } from "react-tooltip";
import {
  Brush,
  File,
  Search,
  MessageCircleMore,
  Settings,
  Code,
} from "lucide-react";

type ChildProps = {
  setCodeMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MainSidebar({ setCodeMode }: ChildProps) {
  const handleBrushModeChange = () => {
    setCodeMode((prev) => {
      if (prev === true) {
        return false;
      } else {
        return false;
      }
    });
  };
  const handleCodeModeChange = () => {
    setCodeMode((prev) => {
      if (prev === false) {
        return true;
      } else {
        return true;
      }
    });
  };

  return (
    <aside className="w-15 flex flex-col items-center gap-4  h-screen border-r border-black bg-[#1c1c1b] text-white z-1000 pt-3">
      <div
        className=""
        title="Code"
        data-tooltip-id="code"
        data-tooltip-content="code"
        onClick={handleCodeModeChange}
      >
        <Code />
      </div>
      <div
        className=""
        title="File"
        data-tooltip-id="file"
        data-tooltip-content="file"
      >
        <File />
      </div>
      <div data-tooltip-id="settings" data-tooltip-content="settings">
        <Settings />
      </div>
      <div
        className=""
        data-tooltip-id="brush"
        data-tooltip-content="brush"
        onClick={handleBrushModeChange}
      >
        <Brush />
      </div>
      <div className="" data-tooltip-id="message" data-tooltip-content="chat">
        <MessageCircleMore />
      </div>
      <div className="" data-tooltip-id="search" data-tooltip-content="search">
        <Search />
      </div>
      <Tooltip id="code" variant="info" />
      <Tooltip id="file" variant="info" />
      <Tooltip id="settings" variant="info" />
      <Tooltip id="brush" variant="info" />
      <Tooltip id="message" variant="info" />
      <Tooltip id="search" variant="info" />
    </aside>
  );
}
