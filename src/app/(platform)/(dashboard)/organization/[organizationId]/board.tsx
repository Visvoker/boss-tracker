"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";

type BoardProps = {
  title: string;
  id: string;
};

export function Board({ title, id }: BoardProps) {
  return (
    <form className="flex items-center gap-x-2 ">
      <p>Board title:{title}</p>
      <Button
        className="cursor-pointer"
        variant="destructive"
        type="submit"
        size="sm"
      >
        Delete
      </Button>
    </form>
  );
}
