import { db } from "@/lib/db";
import Info from "./_components/info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/board-lst";

export default async function OrganizationIdPage() {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4 w-full" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  );
}
