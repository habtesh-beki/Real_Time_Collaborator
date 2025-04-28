import { Resizable } from "re-resizable";

export default function EditorSideBar() {
  return (
    <Resizable
      className="bg-[#151715] h-screen text-white"
      defaultSize={{
        width: 320,
      }}
    >
      Start coding ...
    </Resizable>
  );
}
