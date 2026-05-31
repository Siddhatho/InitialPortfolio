import { AuthProvider } from "@/components/cms/AuthProvider";
import DashboardShell from "@/components/cms/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardShell>{children}</DashboardShell>
    </AuthProvider>
  );
}
