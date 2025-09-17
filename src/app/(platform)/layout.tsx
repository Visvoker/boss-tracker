import { ClerkProvider } from "@clerk/nextjs";

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
        {children}
      </ClerkProvider>
    </>
  );
}
