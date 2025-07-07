import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-4 gap-3">
            <SidebarTrigger />
            <div className="flex-1 flex items-center justify-between">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                DataForge Platform
              </h1>
              <div className="text-sm text-muted-foreground">
                AWS MLOps Data Management
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 bg-gradient-to-br from-background via-background to-muted/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}