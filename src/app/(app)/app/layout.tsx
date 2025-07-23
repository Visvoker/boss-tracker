import AppSidebar from "@/components/app-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[256px] h-full overflow-y-auto">
          <AppSidebar />
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
