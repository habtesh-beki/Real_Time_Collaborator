import { Tooltip } from "react-tooltip";
import {
  Calendar,
  Brush,
  File,
  Search,
  MessageCircleMore,
  Settings,
} from "lucide-react";

export default function MainSidebar() {
  return (
    <aside className="w-15 flex flex-col items-center gap-4  h-screen border-r border-black bg-[#1c1c1b] text-white z-1000">
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
      <div className="" data-tooltip-id="brush" data-tooltip-content="brush">
        <Brush />
      </div>
      <div className="" data-tooltip-id="message" data-tooltip-content="chat">
        <MessageCircleMore />
      </div>
      <div className="" data-tooltip-id="search" data-tooltip-content="search">
        <Search />
      </div>
      <Tooltip id="file" variant="info" />
      <Tooltip id="settings" variant="info" />
      <Tooltip id="brush" variant="info" />
      <Tooltip id="message" variant="info" />
      <Tooltip id="search" variant="info" />
    </aside>
  );
}
