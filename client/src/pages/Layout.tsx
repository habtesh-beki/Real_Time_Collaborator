import { socket } from "../App";
import { Toaster, toast } from "sonner";
import MainSidebar from "../components/MainSidebar";
import EditorSideBar from "../futures/codeEditor/components/EditorSide";
import EditorPage from "../futures/codeEditor/EditorPage";

export default function Layout() {
  socket.on("join-success", (data) => {
    toast.success(` ${data.username} Joined !`, {
      // description: "You can now start chatting.",
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
        <MainSidebar />
        <EditorSideBar />
        <EditorPage />
      </div>
    </div>
  );
}
