import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import EditorPage from "../codeEditor/EditorPage";
// { children }: { children: React.ReactNode }
export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {/* {children} */}
        <EditorPage />
      </main>
    </SidebarProvider>
  );
}
