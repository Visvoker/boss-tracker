import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider
        appearance={{
          cssLayerName: "clerk",
        }}
      >
        <Toaster />
        {children}
      </ClerkProvider>
    </>
  );
}
