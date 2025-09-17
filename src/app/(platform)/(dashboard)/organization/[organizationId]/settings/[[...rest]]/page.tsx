import { OrganizationProfile } from "@clerk/nextjs";

export default function SettingPage() {
  return (
    <div className="w-full ">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: "w-full bg-transparent shadow-none",
            cardBox:
              "shadow-none !min-h-0 !h-auto md:w-auto border-1 border-gray-200",
            // card: "border border-gray-200 w-auto",
          },
        }}
      />
    </div>
  );
}
