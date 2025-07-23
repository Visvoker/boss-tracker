import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex justify-center items-center min-h-10 bg-blue-100">
          <AppHeader />
        </div>
        <div className="flex ">
          <AppSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
